import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
import ComponentDemo from "./pages/ComponentDemo";
import Login from "@pages/Login";

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
    {
        // Seperated to avoid global app layouts
        path: "/login",
        element: <Login />,
    },
]);
