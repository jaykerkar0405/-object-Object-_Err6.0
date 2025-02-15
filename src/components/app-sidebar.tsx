import {
  HomeButton,
  SidebarNavigation,
  UserDropdownButtons,
  UserDropdownTriggerButton,
} from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as React from "react";
import { SwInstallOrUpdateButton } from "./sw-buttons";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center gap-2 flex-row">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-fit" asChild>
              <HomeButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <SidebarMenu className="flex flex-row w-full">
          <SwInstallOrUpdateButton />
          <SidebarMenuItem className="w-full">
            <DropdownMenu>
              <UserDropdownTriggerButton />
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <UserDropdownButtons />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
