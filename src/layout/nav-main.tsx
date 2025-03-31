"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { MenuItem } from "@/router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMain({ items }: { items: MenuItem[] }) {
  const navigate = useNavigate();


  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                onClick={(e) => {
                  if (!item.children) {
                    e.stopPropagation();
                    navigate(item.path);
                  }
                }}
              >
                <SidebarMenuButton tooltip={item.name}>
                  {item.icon && item.icon}
                  <span>{item.name}</span>
                  {item.children && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.children && (
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-0">
                    {item.children?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton asChild>
                          <a
                            onClick={(e) => {
                              navigate(subItem.path);
                            }}
                          >
                            {item.icon && item.icon}
                            <span>{subItem.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
