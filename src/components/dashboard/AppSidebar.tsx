import Link from "next/link";
import { ChevronDown, Folder, Layers, Settings, Star } from "lucide-react";
import { RailOpenCollapsible } from "@/components/dashboard/RailOpenCollapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DEFAULT_ITEM_TYPE_STYLE, ITEM_TYPE_STYLES } from "@/lib/item-types";
import { mockCollections, mockItemTypes, mockUser } from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppSidebar() {
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const recentCollections = mockCollections
    .filter((c) => !c.isFavorite)
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layers />
              </div>
              <span className="text-base font-semibold">DevStash</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <RailOpenCollapsible>
          <SidebarGroup>
            <SidebarGroupLabel
              render={<CollapsibleTrigger />}
              className="group/trigger w-full gap-1 hover:text-sidebar-foreground"
            >
              Types
              <ChevronDown className="-rotate-90 transition-transform group-data-panel-open/trigger:rotate-0" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mockItemTypes.map((type) => {
                    const { icon: Icon, colorClass } =
                      ITEM_TYPE_STYLES[type.name] ?? DEFAULT_ITEM_TYPE_STYLE;
                    return (
                      <SidebarMenuItem key={type.id}>
                        <SidebarMenuButton
                          tooltip={type.slug}
                          render={<Link href={`/items/${type.slug}`} />}
                        >
                          <Icon className={colorClass} />
                          <span className="capitalize">{type.slug}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge className="text-muted-foreground">
                          {type.itemCount}
                        </SidebarMenuBadge>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </RailOpenCollapsible>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        <Collapsible
          defaultOpen
          className="group-data-[collapsible=icon]:hidden"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              render={<CollapsibleTrigger />}
              className="group/trigger w-full gap-1 hover:text-sidebar-foreground"
            >
              Collections
              <ChevronDown className="-rotate-90 transition-transform group-data-panel-open/trigger:rotate-0" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarGroupLabel className="text-[0.65rem] tracking-wider uppercase">
                  Favorites
                </SidebarGroupLabel>
                <SidebarMenu>
                  {favoriteCollections.map((collection) => (
                    <SidebarMenuItem key={collection.id}>
                      <SidebarMenuButton
                        render={<Link href={`/collections/${collection.id}`} />}
                      >
                        <Folder className="text-muted-foreground" />
                        <span>{collection.name}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>

                <SidebarGroupLabel className="mt-2 text-[0.65rem] tracking-wider uppercase">
                  Recent
                </SidebarGroupLabel>
                <SidebarMenu>
                  {recentCollections.map((collection) => (
                    <SidebarMenuItem key={collection.id}>
                      <SidebarMenuButton
                        render={<Link href={`/collections/${collection.id}`} />}
                      >
                        <Folder className="text-muted-foreground" />
                        <span>{collection.name}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge className="text-muted-foreground">
                        {collection.itemCount}
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar>
                {mockUser.image && (
                  <AvatarImage src={mockUser.image} alt={mockUser.name} />
                )}
                <AvatarFallback>{getInitials(mockUser.name)}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate font-medium">{mockUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {mockUser.email}
                </span>
              </div>
              <Settings className="text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
