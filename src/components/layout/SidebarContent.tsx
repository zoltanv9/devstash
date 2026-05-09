"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Code,
  File,
  FolderOpen,
  Image as ImageIcon,
  Link as LinkIcon,
  Search,
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  mockCollections,
  mockItemTypeCounts,
  mockItemTypes,
  mockUser,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

function pluralSlug(typeName: string) {
  return `${typeName.toLowerCase()}s`;
}

export function SidebarContent() {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const sortedCollections = [...mockCollections].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  const initials = mockUser.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 pb-4">
          <div>
            <SectionLabel>Quick Access</SectionLabel>
            <div className="mt-1 space-y-0.5">
              <SidebarLink
                href="/"
                icon={FolderOpen}
                label="All Items"
                count={mockItemTypeCounts.allItems}
              />
              <SidebarLink
                href="/recent"
                icon={Clock}
                label="Recent"
                count={mockItemTypeCounts.recent}
              />
              <SidebarLink
                href="/favorites"
                icon={Star}
                label="Favorites"
                count={mockItemTypeCounts.favorites}
              />
            </div>
          </div>

          <Collapsible open={typesOpen} onOpenChange={setTypesOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              <span>Item Types</span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  !typesOpen && "-rotate-90",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-0.5">
              {mockItemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon] ?? File;
                const count =
                  mockItemTypeCounts.byType[
                    type.id as keyof typeof mockItemTypeCounts.byType
                  ] ?? 0;
                return (
                  <SidebarLink
                    key={type.id}
                    href={`/items/${pluralSlug(type.name)}`}
                    icon={Icon}
                    iconColor={type.color}
                    label={`${type.name}s`}
                    count={count}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={collectionsOpen}
            onOpenChange={setCollectionsOpen}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              <span>Collections</span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  !collectionsOpen && "-rotate-90",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 space-y-0.5">
              {sortedCollections.map((col) => {
                const type = mockItemTypes.find(
                  (t) => t.id === col.defaultTypeId,
                );
                const Icon = type ? ICON_MAP[type.icon] ?? File : File;
                return (
                  <SidebarLink
                    key={col.id}
                    href={`/collections/${col.id}`}
                    icon={Icon}
                    iconColor={type?.color}
                    label={col.name}
                    trailing={
                      col.isFavorite ? (
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      ) : undefined
                    }
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      <Separator />
      <div className="flex items-center gap-3 p-3">
        <Avatar className="size-8">
          <AvatarImage
            src={mockUser.image ?? undefined}
            alt={mockUser.name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{mockUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {mockUser.email}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  iconColor,
  label,
  count,
  trailing,
}: {
  href: string;
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  count?: number;
  trailing?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Icon
        className="size-4 shrink-0"
        style={iconColor ? { color: iconColor } : undefined}
      />
      <span className="flex-1 truncate">{label}</span>
      {trailing}
      {count !== undefined && (
        <span className="text-xs tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
