import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import I18n from "./components/tools/i18n";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/locale/zh_CN';
import "@/assets/css/iconfont.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <I18n.Provider>
          <App />
          <div>sssssssssssssss</div>
        </I18n.Provider>
      </ThemeProvider>
    </BrowserRouter>
  </ConfigProvider>
  // </StrictMode>
);
