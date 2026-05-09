"use client";

import { FolderOpen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import { useSidebar } from "./SidebarProvider";

export function Sidebar() {
  const { desktopOpen, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-72 gap-0 p-0 md:hidden"
        >
          <SheetHeader className="border-b border-border p-4">
            <SheetTitle className="flex items-center gap-2 text-base">
              <FolderOpen className="size-5 text-primary" />
              <span>DevStash</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "hidden shrink-0 border-r border-border bg-background md:flex md:w-64 md:flex-col",
          !desktopOpen && "md:hidden",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
