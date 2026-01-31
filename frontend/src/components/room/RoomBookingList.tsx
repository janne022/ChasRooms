interface RoomBookingsListProps {
    bookings: {
        start: Date | string;
        end: Date | string;
    }[];
}

const toDate = (value: Date | string): Date =>
    value instanceof Date ? value : new Date(value);

export default function RoomBookingsList({ bookings }: RoomBookingsListProps) {
    const normalizedBookings = bookings.map((booking) => {
        console.log(typeof booking.end);
        return {
            start: toDate(booking.start),
            end: toDate(booking.end),
        };
    });

    return (
        <div className="card mt-3">
            <ul className="space-y-3 p-3">
                {normalizedBookings.map((booking, index) => {
                    const date = booking.start.toLocaleDateString();
                    const startTime = booking.start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    const endTime = booking.end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <li
                            key={index}
                            className="flex items-center justify-between border-b pb-2 last:border-b-0"
                        >
                            <span className="font-medium">{date}</span>
                            <span className="text-gray-600">
                                {startTime} – {endTime}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
