import axios from "axios";
import { type Room } from "@/lib/atoms";

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
