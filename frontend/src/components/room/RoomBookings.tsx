interface RoomBookingsProps {
  bookings: {
    start: Date | string;
    end: Date | string;
  }[];
}

const toDate = (value: Date | string): Date =>
  value instanceof Date ? value : new Date(value);

const RoomBookings = ({ bookings }: RoomBookingsProps) => {
  const normalizedBookings = bookings.map((booking) => ({
    start: toDate(booking.start),
    end: toDate(booking.end),
  }));

  return (
    <div className="card mt-3">
      <ul className="p-3 space-y-3">
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
};

export default RoomBookings;
