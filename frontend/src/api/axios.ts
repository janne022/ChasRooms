import type { Booking } from '@/types/booking';
import axios from 'axios';

// Axios config for api
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const createBooking = async ( booking: Booking): Promise<{ data?: Booking; error?: string }> => {
    try {
        const response = await api.post<Booking>(
            "api/bookings/createBooking",
            booking
        );

        return { data: response.data };
    } catch (err) {
        if (axios.isAxiosError(err)) {
        return {
            error:
            err.response?.data?.message ??
            "Failed to create booking",
        };
        }

        return { error: "Unexpected error occurred" };
    }
};
