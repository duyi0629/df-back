import { AppSidebar } from "./app-sidebar";
import AppHeader from "./app-header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import I18n from "@/components/tools/i18n";
import { menuData } from "@/router";
import HistoryTab from "./history-tab";
const findRoute = (routes: any, path: any): any => {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const childRoute = findRoute(route.children, path);
      if (childRoute) {
        return childRoute;
      }
    }
  }
  return null;
};
export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathnames.map((pathname, index) => {
    const currentPath = `/${pathnames.slice(0, index + 1).join("/")}`;
    const route = findRoute(menuData, currentPath);
    return {
      path: currentPath,
      breadcrumb: route?.name || "未知页面",
    };
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <HistoryTab></HistoryTab>
        <header className="flex h-8 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {breadcrumbs[0].breadcrumb}
                </BreadcrumbItem>
                {breadcrumbs[1] && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>{breadcrumbs[1].breadcrumb}</BreadcrumbItem>
                  </>
                )}
                {/* <BreadcrumbPage>{breadcrumbs[1].breadcrumb}</BreadcrumbPage> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
