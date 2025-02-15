"use client";

import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import AppLogo from "@/../public/favicon.png";
import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { SwInstallOrUpdateButton } from "./sw-buttons";
import { useSession } from "@/lib/auth-client";

const data = {
  teams: [
    {
      name: "YogaSense",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      url: "#",
      isActive: true,
      title: "Playground",
      icon: SquareTerminal,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const user = {
    name: session?.user.name || "",
    email: session?.user.email || "",
    avatar: session?.user.image || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center gap-2 flex-row">
        <Image src={AppLogo} alt="logo" height={64} width={64} />
        <span className="font-bold monomakh-regular">YogaSense</span>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <SidebarMenu>
          <SwInstallOrUpdateButton />
        </SidebarMenu>
        {session && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
