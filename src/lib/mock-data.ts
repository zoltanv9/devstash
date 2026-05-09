export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  defaultTypeId: string;
  itemCount: number;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  contentType: "text" | "file" | "url";
  content: string | null;
  url: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: string;
}

export const mockUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "demo@devstash.io",
  image: null,
  isPro: true,
};

export const mockItemTypes: ItemType[] = [
  { id: "type_snippet", name: "Snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_command", name: "Command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_note", name: "Note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_file", name: "File", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "Image", icon: "Image", color: "#ec4899", isSystem: true },
  { id: "type_link", name: "Link", icon: "Link", color: "#10b981", isSystem: true },
];

export const mockCollections: Collection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React hooks and component patterns",
    isFavorite: true,
    defaultTypeId: "type_snippet",
    itemCount: 12,
  },
  {
    id: "col_ai",
    name: "AI Prompts",
    description: "Curated prompts for AI coding assistants",
    isFavorite: true,
    defaultTypeId: "type_prompt",
    itemCount: 8,
  },
  {
    id: "col_devops",
    name: "DevOps Commands",
    description: "Essential CLI commands for deployment",
    isFavorite: false,
    defaultTypeId: "type_command",
    itemCount: 15,
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Notes and resources for technical interviews",
    isFavorite: false,
    defaultTypeId: "type_note",
    itemCount: 6,
  },
  {
    id: "col_links",
    name: "Useful Links",
    description: "Bookmarked documentation and articles",
    isFavorite: false,
    defaultTypeId: "type_link",
    itemCount: 23,
  },
  {
    id: "col_design",
    name: "Design Assets",
    description: "Logos, icons, and design references",
    isFavorite: false,
    defaultTypeId: "type_image",
    itemCount: 9,
  },
];

export const mockItems: Item[] = [
  {
    id: "item_1",
    title: "useDebounce Hook",
    description: "Custom debounce hook for input handling",
    contentType: "text",
    content:
      "import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number): T {",
    url: null,
    language: "typescript",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["react", "hooks", "debounce"],
    createdAt: "2026-05-01T10:00:00Z",
  },
  {
    id: "item_2",
    title: "Docker Container Cleanup",
    description: "Remove all stopped containers and unused images",
    contentType: "text",
    content: "docker system prune -af --volumes",
    url: null,
    language: "bash",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_command",
    collectionIds: ["col_devops"],
    tags: ["docker", "cleanup", "devops"],
    createdAt: "2026-05-02T11:00:00Z",
  },
  {
    id: "item_3",
    title: "Code Review Prompt",
    description: "Prompt for thorough code review analysis",
    contentType: "text",
    content:
      "Review this code for: bugs, security issues, performance, readability, and best practices. Suggest specific improvements.",
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai"],
    tags: ["ai", "code-review", "productivity"],
    createdAt: "2026-05-03T09:30:00Z",
  },
  {
    id: "item_4",
    title: "React Performance Tips",
    description: "Key techniques for optimizing React applications",
    contentType: "text",
    content:
      "1. Use React.memo for expensive components\n2. useMemo for expensive computations\n3. useCallback for stable refs\n4. Code-split with lazy/Suspense",
    url: null,
    language: "markdown",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_react", "col_interview"],
    tags: ["react", "performance", "optimization"],
    createdAt: "2026-05-03T14:15:00Z",
  },
  {
    id: "item_5",
    title: "Tailwind CSS Documentation",
    description: "Official Tailwind CSS documentation",
    contentType: "url",
    content: null,
    url: "https://tailwindcss.com/docs",
    language: null,
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_link",
    collectionIds: ["col_links"],
    tags: ["css", "tailwind", "documentation"],
    createdAt: "2026-05-04T08:00:00Z",
  },
  {
    id: "item_6",
    title: "Git Rebase Interactive",
    description: "Interactive rebase for cleaning commit history",
    contentType: "text",
    content: "git rebase -i HEAD~5",
    url: null,
    language: "bash",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: ["col_devops"],
    tags: ["git", "rebase", "history"],
    createdAt: "2026-05-04T12:45:00Z",
  },
  {
    id: "item_7",
    title: "API Error Handler",
    description: "Centralized error handling for API calls",
    contentType: "text",
    content:
      "export async function fetchWithErrorHandler<T>(url: string, options?: RequestInit): Promise<T> {\n  const res = await fetch(url, options);\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n}",
    url: null,
    language: "typescript",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["api", "error-handling", "fetch"],
    createdAt: "2026-05-05T16:20:00Z",
  },
  {
    id: "item_8",
    title: "Debug Prompt",
    description: "Systematic debugging assistance prompt",
    contentType: "text",
    content:
      "Help me debug this issue. Walk through the code step-by-step, identify likely causes, and suggest fixes ordered by probability.",
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai"],
    tags: ["ai", "debugging", "productivity"],
    createdAt: "2026-05-06T09:00:00Z",
  },
];

export const mockItemTypeCounts = {
  allItems: 76,
  recent: 12,
  favorites: 5,
  byType: {
    type_snippet: 15,
    type_prompt: 8,
    type_command: 12,
    type_note: 6,
    type_file: 4,
    type_image: 9,
    type_link: 23,
  },
};
