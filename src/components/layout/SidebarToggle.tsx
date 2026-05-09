"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarProvider";

export function SidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="size-8"
      aria-label="Toggle sidebar"
    >
      <PanelLeft className="size-4" />
    </Button>
  );
}
