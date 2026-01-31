export interface Booking {
    roomId: number;
    startTime: string;
    endTime: string;
    description: string;
    name: string;
}

export interface BookingForm {
    date: string;
    from: string;
    to: string;
    description: string;
}

export interface MyBookings {
    id: string;
    name: string;
    description: string;
    bookingStartTime: string; // ISO date string
    bookingEndTime: string; // ISO date string
    room: {
        id: number;
        roomName: string;
        capacity: number;
        features: string;
        isOccupied: boolean;
    };
    users: Array<{
        userId: string;
        firstName: string;
        lastName: string;
    }>;
}
