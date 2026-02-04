import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@services/axios";
import type { LoginResponse, GoogleLoginRequest } from "@T/schema";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@lib/atoms";
import { useToast } from "@hooks/useToast";

export default function Login() {
    const { show } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const setToken = useSetAtom(tokenAtom);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const payload: GoogleLoginRequest = {
                idToken: credentialResponse.credential,
            };

            const res = await api.post<LoginResponse>(
                "api/auth/signup",
                payload,
            );

            if (res.data.token) {
                setToken(res.data.token);
            }

            show("Login Success!", "success");
            console.log("Login Success!");

            // Send them backto where they came from
            navigate(from, { replace: true });
        } catch (error) {
            show(`Login failed: ${error}`, "error");
            console.error("Login failed", error);
        }
    };

    const handleDevLogin = async () => {
        try {
            const res = await api.post("api/auth/dev");
            setToken(res.data.token);
            navigate("/");
        } catch (error) {
            console.error("Dev login failed", error);
            show("Dev login failed", "error");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mb-4 text-3xl font-bold">Welcome to ChasRooms</h1>
            <p className="mb-8 text-gray-600">Please sign in to continue</p>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => show("Google Login Failed", "error")}
            />
            {import.meta.env.DEV && (
                <div className="mt-8 border-t pt-4">
                    <p className="mb-2 text-sm text-gray-500">
                        Development Only:
                    </p>
                    <button
                        onClick={handleDevLogin}
                        className="rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-black"
                    >
                        Login as Dev
                    </button>
                </div>
            )}
        </div>
    );
}
