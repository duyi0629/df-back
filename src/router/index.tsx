import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "@/layout";

const Login = React.lazy(() => import("@/views/login"));
const Home = React.lazy(() => import("@/views/home"));
const Article = React.lazy(() => import("@/views/article/index"));
const ArticleList = React.lazy(() => import("@/views/article/list/index"));
const ArticleEdit = React.lazy(() => import("@/views/article/edit/index"));
const UserList = React.lazy(() => import("@/views/users/user-list"));

interface RouterConfig {
  path: string;
  element: React.ReactNode;
  children?: RouterConfig[];
  meta?: {
    menuName?: string; // 显示菜单名称
    icon?: React.ReactElement; // 菜单图标
    hideInMenu?: boolean; // 是否隐藏菜单
  };
}

const isAuthenticated = () => {
  // return localStorage.getItem("token") !== null;
  return localStorage.getItem("token") === null;
};

const AuthGround = ({ children }: any) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export const routes: RouterConfig[] = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    element: (
      // <AuthGround>
      <MainLayout />
      // </AuthGround>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
        meta: {
          menuName: "首页",
        },
      },
      {
        path: "/article",
        element: <Outlet />, // 子路由渲染占位符
        meta: {
          menuName: "文章管理",
        },
        children: [
          {
            path: "list", // 会自动继承父路径
            element: <ArticleList />,
            meta: {
              menuName: "文章列表",
            },
          },
          {
            path: "edit",
            element: <ArticleEdit />,
            meta: {
              menuName: "文章编辑",
            },
          },
        ],
      },
      {
        path: "/users",
        element: <UserList />,
        meta: {
          menuName: "用户管理",
        },
      },
      
    ],
  },
];

export interface MenuItem {
  path: string;
  name: string;
  icon?: React.ReactElement;
  children?: MenuItem[];
  isActive?: boolean;
}

// 生成菜单数据的工具函数
export const generateMenuData = (routes: RouterConfig[], parentPath: string = ''): MenuItem[] => {
  // 拼接父路径和当前路径
  const menus = routes
    .filter((route) => !route.meta?.hideInMenu && route.meta?.menuName)
    .map((route) => {
      const fullPath = `${parentPath}${route.path}`;
      return {
        path: fullPath,
        name: route.meta?.menuName!,
        icon: route.meta?.icon,
        children: route.children ? generateMenuData(route.children, `${fullPath}/`) : undefined, // 修正递归调用参数
      };
    });

  console.log(menus, "menus");
  return menus;
};
// 导出菜单数据
export const menuData = generateMenuData(routes[1].children!);
