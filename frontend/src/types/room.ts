export type RoomStatus = "available" | "occupied";

export type Room = {
    id: number;
    previewUrl?: string;
    roomName: string;
    capacity: number;
    features: string;
    isOccupied: boolean;
};

export type RoomById = {
    id: number;
    previewUrl?: string;
    name: string;
    capacity: number;
    resources: string[];
    isOccupied: boolean;
    bookings: [
        {
            start: Date;
            end: Date;
        },
    ];
};
