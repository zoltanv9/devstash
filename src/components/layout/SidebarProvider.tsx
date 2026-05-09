"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarContextValue = {
  desktopOpen: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggle: () => void;
  isMobile: boolean;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = () => {
    if (isMobile) {
      setMobileOpen((o) => !o);
    } else {
      setDesktopOpen((o) => !o);
    }
  };

  return (
    <SidebarContext.Provider
      value={{ desktopOpen, mobileOpen, setMobileOpen, toggle, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
