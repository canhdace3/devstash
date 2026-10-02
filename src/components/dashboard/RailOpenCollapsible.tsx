"use client";

import { useState, type ReactNode } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import { useSidebar } from "@/components/ui/sidebar";

interface RailOpenCollapsibleProps {
  children: ReactNode;
}

// Collapsible that is forced open while the sidebar is collapsed to the icon rail
export function RailOpenCollapsible({ children }: RailOpenCollapsibleProps) {
  const { state, isMobile } = useSidebar();
  const [open, setOpen] = useState(true);
  const isRail = state === "collapsed" && !isMobile;

  return (
    <Collapsible open={open || isRail} onOpenChange={setOpen}>
      {children}
    </Collapsible>
  );
}
