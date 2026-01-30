import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
import ComponentDemo from "@pages/ComponentDemo";
import RoomDetails from "@pages/RoomDetails";

import Login from "@pages/Login";
import { RequireAuth, RequireGuest } from "./components/auth/AuthGuard";

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
                path: "/rooms/:id",
                element: <RoomDetails />,
            },

            {
                path: "/demo",
                element: <ComponentDemo />,
            },
        ],
    },
    {
        // Login seperated to avoid global layout, Login requires you to NOT be logged in
        element: <RequireGuest />,
        children: [{ path: "/login", element: <Login /> }],
    },
]);
