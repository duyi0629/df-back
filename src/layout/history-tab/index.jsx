import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuData } from "@/router";
import classNames from "classnames";
import index from "@/views/home";
import { Wrapper } from "./style";

const HistoryTap = memo(() => {
  const navigate = useNavigate();
  const [historyRoutes, setHistoryRoutes] = useState(() => {
    // 初始化时获取本地缓存的路由
    const historyData = localStorage.getItem("history-tab");
    return historyData ? JSON.parse(historyData) : [];
  });

  const location = useLocation();
  const [activeRouter, setActiveRouter] = useState(location.pathname);
  const [leaveIndex, setLeaveIndex] = useState(-1);
  const [addedIndices, setAddedIndices] = useState([]);
  const prevHistoryRoutesRef = useRef(historyRoutes);

  // 删除路由
  const handleRouteDel = (e, routerInfo, index) => {
    if (historyRoutes.length === 1) return;
    e.stopPropagation();
    const newRoutes = historyRoutes.filter(
      (route, index) => route.path !== routerInfo.path
    );

    let routeIndex = -1;
    newRoutes.forEach((route, index) => {
      if (activeRouter === routerInfo.path) {
        routeIndex = index;
      }
    });

    if (routeIndex !== -1) {
      routeIndex = newRoutes.length - 1;
      const newActiveRouter = newRoutes[routeIndex].path;
      setActiveRouter(newActiveRouter);
      navigate(newActiveRouter);
    }

    setHistoryRoutes(newRoutes);
    localStorage.setItem("history-tab", JSON.stringify(newRoutes));
  };
  useEffect(() => {
    const prevRoutes = prevHistoryRoutesRef.current;
    const newRoutes = historyRoutes;
    const addedRoutes = newRoutes.filter(
      (route) => !prevRoutes.some((prevRoute) => prevRoute.path === route.path)
    );
    const newAddedIndices = [];
    addedRoutes.forEach((addedRoute) => {
      const index = newRoutes.findIndex(
        (route) => route.path === addedRoute.path
      );
      newAddedIndices.push(index);
    });
    setAddedIndices(newAddedIndices);
    setTimeout(() => {
      setAddedIndices([]);
    }, 30000); // 动画持续时间为 0.3s
    prevHistoryRoutesRef.current = newRoutes;
  }, [historyRoutes]);

  // 缓存扁平化后的路由数据
  const newMenuData = useMemo(() => {
    const flattenArr = (arr) => {
      let data = [];
      for (const v of arr) {
        if (v.children) {
          data = data.concat(flattenArr(v.children));
        } else {
          data.push(v);
        }
      }
      return data;
    };
    return flattenArr(menuData);
  }, [menuData]);

  useEffect(() => {
    const currentPath = location.pathname;
    console.log(newMenuData, "menuData");
    const routerInfo = newMenuData.filter(
      (router) => router.path === currentPath
    )[0];

    setHistoryRoutes((prev) => {
      // 1. 判断路由是否是当前页面
      setActiveRouter(currentPath);
      if (prev[0]?.path === currentPath) return prev;

      // 2. 判断路由是否存在
      const isNewRouter =
        prev.filter((item) => item.path === currentPath).length === 0;
      let newHistory = [...prev];
      if (isNewRouter) {
        const { path, name, icon } = routerInfo;
        newHistory.push({ path, name, icon });
        localStorage.setItem("history-tab", JSON.stringify(newHistory));
      }
      return newHistory;
    });
  }, [location]);
  return (
    <section className=" h-10 border-y border-border">
      <div className="flex items-center mt-1 ">
        {historyRoutes.map((router, index) => (
          <Wrapper
            key={index}
            className={classNames(
              " mr-2 px-2 py-1  cursor-pointer hover:text-primary hover:bg-opacity-10 hover:rounded-t-md",
              {
                "slide-right-enter-to slide-right-enter-active":
                  addedIndices.includes(index),
                "text-primary  bg-opacity-10 rounded-t-md":
                  router.path === activeRouter,
                "slide-left-leave-to slide-left-leave-active ":
                  leaveIndex == index,
              }
            )}
            onClick={() => navigate(router.path)}
          >
            <i className={classNames("iconfont mr-1", router.icon)} />
            {router.name}
            <i
              onClick={(e) => handleRouteDel(e, router, index)}
              className={classNames(
                "iconfont icon-delete ml-1 hover:bg-gray-300 hover:rounded-full",
                {
                  "cursor-not-allowed": historyRoutes.length === 1,
                }
              )}
            />
          </Wrapper>
        ))}
      </div>
    </section>
  );
});

export default HistoryTap;
