import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import I18n from "./components/tools/i18n";
import "@/assets/css/iconfont.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <I18n.Provider>
          <App />
        </I18n.Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
