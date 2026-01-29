import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
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
        ],
    },
    {
        // Login seperated to avoid global layout, Login requires you to NOT be logged in
        element: <RequireGuest />,
        children: [
          { path: "/login", element: <Login /> },
        ],
      },
]);
