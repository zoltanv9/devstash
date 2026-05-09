import {
  Code,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Collection, ItemType } from "@/lib/mock-data";

function typeIcon(icon: string): LucideIcon {
  switch (icon) {
    case "Code":
      return Code;
    case "Sparkles":
      return Sparkles;
    case "Terminal":
      return Terminal;
    case "StickyNote":
      return StickyNote;
    case "Image":
      return ImageIcon;
    case "Link":
      return LinkIcon;
    case "File":
    default:
      return File;
  }
}

export function CollectionCard({
  collection,
  type,
}: {
  collection: Collection;
  type: ItemType | undefined;
}) {
  const color = type?.color ?? "#6b7280";
  const Icon = typeIcon(type?.icon ?? "File");

  return (
    <Card
      className="relative flex h-full flex-col gap-3 overflow-hidden p-4 transition-colors hover:border-foreground/20"
      style={{ backgroundColor: `${color}14` }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-start justify-between gap-2 pt-1">
        <h3 className="line-clamp-1 text-sm font-semibold">{collection.name}</h3>
        {collection.isFavorite && (
          <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
      </div>
      <p className="line-clamp-2 flex-1 text-xs text-muted-foreground">
        {collection.description}
      </p>
      <div className="flex items-center justify-between">
        <Icon className="size-4" style={{ color }} />
        <span className="text-xs text-muted-foreground">
          {collection.itemCount} items
        </span>
      </div>
    </Card>
  );
}
