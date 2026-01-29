import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
import ComponentDemo from "./pages/ComponentDemo";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/demo",
                element: <ComponentDemo />,
            },
        ],
    },
]);
