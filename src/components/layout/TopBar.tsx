import { FolderOpen, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarToggle } from "./SidebarToggle";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      <div className="flex flex-1 items-center gap-2">
        <SidebarToggle />
        <div className="hidden items-center gap-2 md:flex">
          <FolderOpen className="h-6 w-6 text-primary" />
          <span className="text-base font-semibold tracking-tight">
            DevStash
          </span>
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          <Plus className="size-4" />
          New Collection
        </Button>
        <Button size="sm">
          <Plus className="size-4" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
