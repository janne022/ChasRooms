import axios from "axios";
import { type Room } from "@/lib/atoms";
import type { Booking } from '@/types/booking';
import { api } from "./axios";


export const getAllMockRooms = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a 1-second delay

        const response = await axios.get("/data/rooms.json");
        return response.data as Room[];
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};


export const createBooking = async ( booking: Booking): Promise<{ data?: Booking; error?: string }> => {
    const token = localStorage.getItem("token")?.slice(1, -1);

    try {
        const response = await api.post<Booking>(
            "api/bookings/createBooking",
            booking,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
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
