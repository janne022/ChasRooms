import axios from "axios";
import { type Room, type RoomById } from "@/types/room";

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

export const getAllRooms = async (token: string) => {
    try {
        const response = await axios.get("/api/rooms", {
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
        const response = await axios.get(`/api/rooms/${id}`, {
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
