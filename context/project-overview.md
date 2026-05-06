# DevStash — Project Overview

> **One fast, searchable, AI-enhanced hub for all dev knowledge & resources.**

---

## Table of Contents

1. [Problem & Vision](#1-problem--vision)
2. [Target Users](#2-target-users)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Models & Prisma Schema](#5-data-models--prisma-schema)
6. [Features](#6-features)
7. [Item Types Reference](#7-item-types-reference)
8. [Monetization](#8-monetization)
9. [UI/UX Guidelines](#9-uiux-guidelines)
10. [Project Structure](#10-project-structure)
11. [Key Implementation Notes](#11-key-implementation-notes)

---

## 1. Problem & Vision

Developers scatter their essential knowledge across a dozen tools:

| Resource | Typically Stored In |
|---|---|
| Code snippets | VS Code, Notion, GitHub Gists |
| AI prompts | Chat histories |
| Context files | Buried inside project folders |
| Useful links | Browser bookmarks |
| Documentation | Random folders |
| Commands | `.txt` files, bash history |
| Templates | GitHub Gists |

This causes **context switching**, **lost knowledge**, and **inconsistent workflows**.

**DevStash** solves this with a single, fast, searchable workspace — purpose-built for developers.

---

## 2. Target Users

| Persona | Primary Need |
|---|---|
| **Everyday Developer** | Fast retrieval of snippets, prompts, commands, links |
| **AI-first Developer** | Organise prompts, context files, system messages, workflows |
| **Content Creator / Educator** | Store code blocks, explanations, course notes |
| **Full-stack Builder** | Collect patterns, boilerplates, API examples |

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) / React 19 (SSR + API routes) |
| **Language** | TypeScript |
| **Database** | [Neon](https://neon.tech/) — serverless PostgreSQL |
| **ORM** | [Prisma 7](https://www.prisma.io/docs) |
| **Auth** | [NextAuth v5](https://authjs.dev/) — email/password + GitHub OAuth |
| **File Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) |
| **AI** | OpenAI `gpt-4o-mini` |
| **CSS** | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Caching** | Redis *(optional, TBD)* |
| **Payments** | Stripe |

> ⚠️ **DB Rule:** Never use `prisma db push`. Always create and run migrations (`prisma migrate dev` → `prisma migrate deploy`).

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Next.js App                       │
│                                                          │
│  ┌──────────────┐   ┌────────────────┐  ┌────────────┐  │
│  │  SSR Pages   │   │   API Routes   │  │  Auth      │  │
│  │  (React 19)  │   │  /api/items    │  │  NextAuth  │  │
│  │              │   │  /api/upload   │  │  v5        │  │
│  │              │   │  /api/ai       │  │            │  │
│  └──────────────┘   └────────────────┘  └────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┼──────────────────┐
        ▼                   ▼                  ▼
  ┌──────────┐       ┌────────────┐     ┌───────────┐
  │  Neon DB │       │Cloudflare  │     │  OpenAI   │
  │PostgreSQL│       │    R2      │     │   API     │
  │  Prisma  │       │(file/image │     │(AI feats) │
  └──────────┘       │ uploads)   │     └───────────┘
                     └────────────┘
```

**URL conventions by item type:**

| Content Type | URL Pattern | Example |
|---|---|---|
| Text (snippet, note, prompt, command) | `/items/[type]s` | `/items/snippets` |
| URL (link) | `/items/links` | `/items/links` |
| File (file, image) | `/items/files` | `/items/files` |

---

## 5. Data Models & Prisma Schema

> This is the initial schema. Adjust as requirements evolve — always generate a migration file for any changes.

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── User ────────────────────────────────────────────────

model User {
  id                    String       @id @default(cuid())
  name                  String?
  email                 String       @unique
  emailVerified         DateTime?
  image                 String?
  password              String?      // hashed, null for OAuth users
  isPro                 Boolean      @default(false)
  stripeCustomerId      String?      @unique
  stripeSubscriptionId  String?      @unique
  createdAt             DateTime     @default(now())
  updatedAt             DateTime     @updatedAt

  accounts              Account[]
  sessions              Session[]
  items                 Item[]
  collections           Collection[]
  itemTypes             ItemType[]   // custom types only

  @@map("users")
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ─── Item Type ───────────────────────────────────────────

model ItemType {
  id       String  @id @default(cuid())
  name     String  // "snippet", "prompt", "command", etc.
  icon     String  // Lucide icon name, e.g. "Code"
  color    String  // Hex color, e.g. "#3b82f6"
  isSystem Boolean @default(false)

  userId String?
  user   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  items  Item[]

  @@map("item_types")
}

// ─── Item ────────────────────────────────────────────────

model Item {
  id          String   @id @default(cuid())
  title       String
  description String?
  contentType String   // "text" | "file" | "url"
  content     String?  @db.Text  // text content; null for file/url types
  fileUrl     String?  // Cloudflare R2 URL
  fileName    String?  // original filename
  fileSize    Int?     // bytes
  url         String?  // for link type
  language    String?  // e.g. "typescript", for code highlighting
  isFavorite  Boolean  @default(false)
  isPinned    Boolean  @default(false)
  lastUsedAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemTypeId String
  itemType   ItemType @relation(fields: [itemTypeId], references: [id])
  tags       TagsOnItems[]
  collections ItemsOnCollections[]

  @@map("items")
}

// ─── Collection ──────────────────────────────────────────

model Collection {
  id            String   @id @default(cuid())
  name          String
  description   String?
  isFavorite    Boolean  @default(false)
  defaultTypeId String?  // ItemType id for display hint
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  items  ItemsOnCollections[]

  @@map("collections")
}

// ─── Join Tables ─────────────────────────────────────────

model ItemsOnCollections {
  itemId       String
  collectionId String
  addedAt      DateTime @default(now())

  item       Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  @@id([itemId, collectionId])
  @@map("items_on_collections")
}

model Tag {
  id    String        @id @default(cuid())
  name  String        @unique
  items TagsOnItems[]

  @@map("tags")
}

model TagsOnItems {
  itemId String
  tagId  String

  item Item @relation(fields: [itemId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([itemId, tagId])
  @@map("tags_on_items")
}
```

---

## 6. Features

### A. Items & Item Types

- Items have a **type** (snippet, prompt, note, command, file, image, link)
- System types are built-in and cannot be modified
- Users can create **custom types** (Pro — coming later)
- Items are created/edited in a **slide-over drawer** for speed
- Items support **pinning** (floats to top) and **favouriting**

### B. Collections

- Users group items into named collections (e.g. "React Patterns", "Interview Prep")
- An item can belong to **multiple collections** simultaneously
- Collections are colour-coded based on their dominant item type
- Collections support favouriting

### C. Search

Full-text search across:
- Item title
- Item content / description
- Tags
- Type

### D. Authentication

- Email/password (credentials)
- GitHub OAuth
- Powered by **NextAuth v5**

### E. Core Features

| Feature | Notes |
|---|---|
| Markdown editor | For text-based item types |
| File upload | For `file` and `image` types (R2) |
| Import from file | Paste or upload code directly |
| Export data | JSON / ZIP (Pro) |
| Recently used | Tracks `lastUsedAt` per item |
| Pinned items | `isPinned` floats items to top |
| Multi-collection membership | Items can be in many collections |
| Dark mode | Default; light mode optional |
| Syntax highlighting | For code snippets |

### F. AI Features *(Pro only)*

| Feature | Description |
|---|---|
| **Auto-tag suggestions** | Suggests relevant tags based on content |
| **AI Summary** | Generates a short summary of any item |
| **Explain This Code** | Plain-English explanation of a snippet or command |
| **Prompt Optimizer** | Rewrites saved prompts for better AI output |

> During development, all users have access to Pro features. Gating is enforced at launch.

---

## 7. Item Types Reference

| Type | Icon | Color | Content Type | URL |
|---|---|---|---|---|
| Snippet | `Code` | `#3b82f6` (blue) | text | `/items/snippets` |
| Prompt | `Sparkles` | `#8b5cf6` (purple) | text | `/items/prompts` |
| Command | `Terminal` | `#f97316` (orange) | text | `/items/commands` |
| Note | `StickyNote` | `#fde047` (yellow) | text | `/items/notes` |
| File | `File` | `#6b7280` (gray) | file | `/items/files` |
| Image | `Image` | `#ec4899` (pink) | file | `/items/images` |
| Link | `Link` | `#10b981` (emerald) | url | `/items/links` |

> All icons are from [Lucide React](https://lucide.dev/icons/).

---

## 8. Monetization

### Free Tier

- 50 items total
- 3 collections
- All system types **except** file & image
- Basic search
- No AI features
- No file/image uploads

### Pro — $8/month or $72/year

- Unlimited items
- Unlimited collections
- File & image uploads (Cloudflare R2)
- Custom item types *(coming later)*
- All AI features
- Data export (JSON / ZIP)
- Priority support

Payments handled by **Stripe** via `stripeCustomerId` and `stripeSubscriptionId` on the User model.

---

## 9. UI/UX Guidelines

### Design Principles

- Modern, minimal, developer-focused
- Dark mode by default; light mode available
- Clean typography, generous whitespace
- Subtle borders and shadows
- Reference: [Notion](https://notion.so), [Linear](https://linear.app), [Raycast](https://raycast.com)

### Layout

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (collapsible)   │  Main Content              │
│                          │                            │
│  Item Types              │  Collection cards (grid)   │
│  ├── Snippets            │  ┌──────┐ ┌──────┐        │
│  ├── Prompts             │  │ 🔵   │ │ 🟣   │        │
│  ├── Commands            │  │React │ │ AI   │        │
│  ├── Notes               │  │Hooks │ │Promps│        │
│  ├── Files               │  └──────┘ └──────┘        │
│  ├── Images              │                            │
│  └── Links               │  Items (colour-coded cards)│
│                          │  ┌────────────────────┐   │
│  Collections             │  │ [Code] useDebounce  │   │
│  ├── React Patterns      │  └────────────────────┘   │
│  └── Interview Prep      │                            │
└──────────────────────────┴────────────────────────────┘
```

- **Collection cards** — background colour based on dominant item type
- **Item cards** — left border colour matches item type
- **Item detail** — opens in a right-side drawer
- **Mobile** — sidebar collapses to a drawer

### Micro-interactions

- Smooth transitions on drawer open/close
- Hover states on all cards
- Toast notifications for create / update / delete
- Loading skeletons while data fetches

---

## 10. Project Structure

Recommended Next.js 16 App Router layout:

```
devstash/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Sidebar + main shell
│   │   ├── page.tsx            # Home / recent items
│   │   ├── items/
│   │   │   └── [type]/         # /items/snippets, /items/links, etc.
│   │   └── collections/
│   │       └── [id]/
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── items/
│       ├── collections/
│       ├── upload/
│       └── ai/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── items/
│   │   ├── ItemCard.tsx
│   │   ├── ItemDrawer.tsx
│   │   └── ItemForm.tsx
│   ├── collections/
│   │   └── CollectionCard.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       └── SearchBar.tsx
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # NextAuth config
│   ├── r2.ts                   # Cloudflare R2 client
│   ├── openai.ts               # OpenAI client
│   └── stripe.ts               # Stripe client
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                 # Seeds system ItemTypes
├── types/
│   └── index.ts
└── middleware.ts               # Auth protection
```

---

## 11. Key Implementation Notes

### Database Migrations

```bash
# Dev — creates migration file and applies it
npx prisma migrate dev --name <migration-name>

# Prod — applies pending migrations only
npx prisma migrate deploy

# Never use:
# npx prisma db push  ❌
```

### Seeding System Item Types

Run `prisma/seed.ts` on first setup to insert the seven system `ItemType` records (snippet, prompt, command, note, file, image, link) with their colours and icons. These have `isSystem: true` and `userId: null`.

### File Uploads (Cloudflare R2)

1. Client requests a **presigned URL** from `/api/upload`
2. Client uploads directly to R2 using the presigned URL
3. Client sends the resulting `fileUrl` to `/api/items` to save the item
4. On item delete, trigger R2 object deletion

### AI Calls

All AI calls go through `/api/ai/[feature]` (e.g. `/api/ai/explain`, `/api/ai/tag`). Validate `isPro` server-side before calling OpenAI. Use `gpt-4o-mini` for cost efficiency.

### Pro Gating

During development, `isPro` checks are bypassed. Before launch, add middleware/checks at the API route level for:
- File/image upload
- AI feature endpoints
- Item count > 50
- Collection count > 3

### NextAuth v5 Setup

```ts
// lib/auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({ /* email/password logic */ }),
  ],
  session: { strategy: "jwt" }, // required for credentials
})
```

---

*Last updated: May 2026*
