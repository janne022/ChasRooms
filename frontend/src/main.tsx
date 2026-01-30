import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "@/router";
import "@/style.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </QueryClientProvider>
        
    </StrictMode>,
);
