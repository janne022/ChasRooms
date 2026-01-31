import RoomCard from "@/components/room/RoomCard";
import { getMyBookings } from "@/services/api";
import { tokenAtom } from "@/lib/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import GoBackButton from "@/components/GoBackButton";

export default function BookingList() {
    const token = useAtomValue(tokenAtom);
    const {
        data: bookings,
        isPending,
        isError,
    } = useQuery({
        queryFn: async () => await getMyBookings(token),
        queryKey: ["my-bookings"],
        staleTime: 0,
        enabled: !!token,
    });

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum </div>;
    }

    return (
        <>
            <GoBackButton />
            {bookings.length <= 0 ? (
                <p> Du har inga bokningar just nu ! </p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                    {bookings?.map(({ room }, index) => {
                        return (
                            <li key={index}>
                                <RoomCard key={room.id} {...room} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
