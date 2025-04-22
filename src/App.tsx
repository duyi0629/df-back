import { useRoutes } from "react-router-dom";
import { routes } from "@/router";


export default function App() {
  const routing = useRoutes(routes);
  return routing;
}   