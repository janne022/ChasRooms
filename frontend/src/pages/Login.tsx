import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "@services/axios";
import type { LoginResponse, GoogleLoginRequest } from "@/types/schema";

export default function Login() {
    const navigate = useNavigate();

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
                localStorage.setItem("token", res.data.token);
            }

            console.log("Login Success!", res.data);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mb-4 text-3xl font-bold">Welcome to ChasRooms</h1>
            <p className="mb-8 text-gray-600">Please sign in to continue</p>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
            />
        </div>
    );
}
