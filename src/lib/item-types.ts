import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

interface ItemTypeStyle {
  icon: LucideIcon;
  colorClass: string;
}

// Icon and Tailwind color for each system type, keyed by type name
export const ITEM_TYPE_STYLES: Record<string, ItemTypeStyle> = {
  snippet: { icon: Code, colorClass: "text-blue-500" },
  prompt: { icon: Sparkles, colorClass: "text-violet-500" },
  command: { icon: Terminal, colorClass: "text-orange-500" },
  note: { icon: StickyNote, colorClass: "text-yellow-300" },
  file: { icon: File, colorClass: "text-gray-500" },
  image: { icon: Image, colorClass: "text-pink-500" },
  link: { icon: Link, colorClass: "text-emerald-500" },
};

export const DEFAULT_ITEM_TYPE_STYLE: ItemTypeStyle = {
  icon: File,
  colorClass: "text-muted-foreground",
};
