import axios from "axios";
import { api } from "@services/axios";
import type { Booking, MyBookings } from "@T/booking";
import { type Room, type RoomById } from "@T/room";

export const createBooking = async (
    booking: Booking,
    token: string,
): Promise<{ data?: Booking; error?: string }> => {
    try {
        const response = await api.post<Booking>(
            "api/bookings/createBooking",
            booking,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return { data: response.data };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return {
                error:
                    err.response?.data?.message ?? "Failed to create booking",
            };
        }

        return { error: "Unexpected error occurred" };
    }
};

export const getAllRooms = async (token: string) => {
    try {
        const response = await api.get("/api/rooms", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.rooms as Room[];
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const getRoomById = async (token: string, id: string) => {
    try {
        const response = await api.get(`/api/rooms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.room as RoomById;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const getMyBookings = async (token: string) => {
    try {
        const response = await api.get(`/api/bookings/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.bookings as MyBookings[];
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};
