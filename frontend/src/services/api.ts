import axios from "axios";
import type { Booking, MyBookings } from "@/types/booking";
import { api } from "./axios";
import { type Room, type RoomById } from "@/types/room";

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

        console.log("createBooking:", response.data);

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
        const response = await axios.get("/api/rooms", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("getAllRooms:", response.data.rooms);
        return response.data.rooms as Room[];
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const getRoomById = async (token: string, id: string) => {
    try {
        const response = await axios.get(`/api/rooms/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("getRoomById:", response.data.room);
        return response.data.room as RoomById;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};

export const getMyBookings = async (token: string) => {
    try {
        const response = await axios.get(`/api/bookings/my`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("getMyBookings:", response.data.bookings);
        return response.data.bookings as MyBookings[];
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};
