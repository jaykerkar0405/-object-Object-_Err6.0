"use client";

import { signOut, useSession } from "@/lib/auth-client";
import {
  Brain,
  ChartNoAxesCombinedIcon,
  ChevronUp,
  CogIcon,
  Flower2,
  LayoutDashboardIcon,
  LoaderCircle,
  LogInIcon,
  LogOutIcon,
  NotebookTextIcon,
  PersonStandingIcon,
  Trophy,
  User2,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

export function HomeButton() {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      className="w-full justify-start text-start h-fit"
      variant="secondary"
      onClick={() => setOpenMobile(false)}
      asChild
    >
      <Link className="text-xl font-semibold w-full p-2" href="/">
        <Image src="/favicon.png" alt="logo" width={48} height={48} />
        YogaSense
      </Link>
    </Button>
  );
}

export function SidebarNavigation() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const linkGroups = [
    {
      label: "Application",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
        {
          label: "Analytics",
          href: "/analytics",
          icon: ChartNoAxesCombinedIcon,
        },
      ],
    },
    {
      label: "Items",
      items: [
        { label: "Poses", href: "/poses", icon: PersonStandingIcon },
        { label: "Routines", href: "/routines", icon: NotebookTextIcon },
        { label: "Breathing", href: "/breathing", icon: Wind },
        { label: "Meditation", href: "/meditation", icon: Brain },
        { label: "Yoga Studio", href: "/yoga-studio", icon: Flower2 },
        { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
      ],
    },
  ];

  return linkGroups.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                onClick={() => setOpenMobile(false)}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}

export function UserDropdownButtons() {
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/settings" onClick={() => setOpenMobile(false)}>
          <CogIcon /> Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/profile" onClick={() => setOpenMobile(false)}>
          <User2 /> Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-destructive"
        onClick={() => {
          signOut();
          localStorage.clear();
        }}
      >
        <LogOutIcon />
        Logout
      </DropdownMenuItem>
    </>
  );
}

export function UserDropdownTriggerButton() {
  const session = useSession();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || session.isPending) {
    return (
      <SidebarMenuButton variant="outline" className="justify-center" disabled>
        <LoaderCircle className="animate-spin" />
      </SidebarMenuButton>
    );
  }

  if (session.error) {
    toast.error("Failed to fetch user session");
    console.error(session.error);
    return null;
  }

  if (!session.data) {
    return (
      <SidebarMenuButton variant="outline" asChild>
        <Link href="/sign-in">
          <LogInIcon /> Login
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton variant="outline">
        <User2 /> <span className="truncate">{session.data.user.name}</span>{" "}
        <ChevronUp className="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
}
