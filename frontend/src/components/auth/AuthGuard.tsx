import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAtom, useAtomValue } from "jotai";
import { tokenAtom } from "@/lib/atoms";
import { RESET } from "jotai/utils";

interface DecodedToken {
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
        | string
        | string[];
    role?: string | string[];
}

// Protect private routes
export const RequireAuth = ({ allowedRoles }: { allowedRoles?: string[] }) => {
    const [token, setToken] = useAtom(tokenAtom);
    const location = useLocation();

    // Redirect to login page if not logged in, redirect back when logged in
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check roles (future implementation)
    if (allowedRoles) {
        try {
            const decoded = jwtDecode<DecodedToken>(token);

            // I love microsoft role schema
            const userRoles =
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] || decoded.role;
            const rolesArray = Array.isArray(userRoles)
                ? userRoles
                : [userRoles || ""];

            // Check if they have correct roles
            if (!allowedRoles.some((role) => rolesArray.includes(role))) {
                return <Navigate to="/unauthorized" replace />;
            }
        } catch (error) {
            // Remove token if it isn't valid
            setToken(RESET);
            return <Navigate to="/login" replace />;
        }
    }
    return <Outlet />;
};

// Require user to be guest
export const RequireGuest = () => {
    const token = useAtomValue(tokenAtom);

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
