import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api/axios';
import type { LoginResponse, GoogleLoginRequest } from '../types/schema';
export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const payload: GoogleLoginRequest = {
                idToken: credentialResponse.credential
            };

            const res = await api.post<LoginResponse>('api/auth/signup', payload);

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }

            // Probs replace these with toaster notification or something
            console.log("Login Success!", res.data);

            // Send them backto where they came from
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleDevLogin = async () => {
        try {
            const res = await api.post('api/auth/dev');
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            console.error("Dev login failed", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Welcome to ChasRooms</h1>
            <p className="mb-8 text-gray-600">Please sign in to continue</p>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Google Login Failed')}
            />
            {import.meta.env.DEV && (
                <div className="mt-8 border-t pt-4">
                    <p className="text-sm text-gray-500 mb-2">Development Only:</p>
                    <button
                        onClick={handleDevLogin}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black transition"
                    >
                    Login as Dev
                    </button>
                </div>
            )}
        </div>
    );
}