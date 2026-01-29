import { atom } from "jotai";

// Temporary type for mock data
export type Room = {
    room_number: number;
    capacity: number;
    availability: boolean;
};

export const filterValueAtom = atom<"all" | "available">("all");
