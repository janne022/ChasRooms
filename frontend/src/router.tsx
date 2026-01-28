import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
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
        ],
    },
    {
        // Seperated to avoid global app layouts
        path: "/login",
        element: <Login />
    }
]);
