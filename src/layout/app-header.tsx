import React, { memo } from "react";
import { NavUser } from "./nav-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const AppHeader = memo(() => {
  return (
    <div className="flex justify-between items-center px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center">
        <ModeToggle />
        <NavUser user={user} />
      </div>
    </div>
  );
});

export default AppHeader;
