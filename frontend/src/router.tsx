import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@pages/Home";
import FilterDemo from "./pages/FilterDemo";

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
                path: "/filter-demo",
                element: <FilterDemo />,
            },
        ],
    },
]);
