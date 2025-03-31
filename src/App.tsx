import { useRoutes } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";
import Page from "./layout";
import { routes } from "@/router";


export default function App() {
  return (
     useRoutes(routes)
  );
}
