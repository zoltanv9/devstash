import {
  Code,
  ExternalLink,
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
import type { Item, ItemType } from "@/lib/mock-data";

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

export function ItemCard({
  item,
  type,
}: {
  item: Item;
  type: ItemType | undefined;
}) {
  const color = type?.color ?? "#6b7280";
  const Icon = typeIcon(type?.icon ?? "File");

  return (
    <Card className="relative flex h-full flex-col gap-3 overflow-hidden p-4 pl-5 transition-colors hover:border-foreground/20">
      <div
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0" style={{ color }} />
          <h3 className="line-clamp-1 text-sm font-semibold">{item.title}</h3>
        </div>
        {item.isFavorite && (
          <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
      </div>

      <p className="line-clamp-2 text-xs text-muted-foreground">
        {item.description}
      </p>

      {item.contentType === "text" && item.content && (
        <pre
          className="overflow-hidden rounded-md bg-muted/50 px-3 py-2 font-mono text-[11px] leading-relaxed text-foreground/80"
          style={{ borderLeft: `2px solid ${color}` }}
        >
          <code className="line-clamp-2 block whitespace-pre-wrap break-all">
            {item.content}
          </code>
        </pre>
      )}

      {item.contentType === "url" && item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 truncate text-xs text-emerald-400 hover:underline"
        >
          <ExternalLink className="size-3 shrink-0" />
          <span className="truncate">{item.url}</span>
        </a>
      )}

      {item.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
