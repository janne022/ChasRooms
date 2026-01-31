import RoomCard from "@/components/room/RoomCard";
import { getAllRooms } from "@/services/api";
import { filterValueAtom, tokenAtom } from "@/lib/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function RoomList() {
    const token = useAtomValue(tokenAtom);
    const filterValue = useAtomValue(filterValueAtom);
    const {
        data: rooms,
        isPending,
        isError,
    } = useQuery({
        queryFn: async () => await getAllRooms(token),
        queryKey: ["rooms"],
        enabled: !!token,
    });

    const availableRooms = rooms?.filter((room) => !room.isOccupied);
    const displayedRooms = filterValue === "all" ? rooms : availableRooms;

    if (isPending) {
        return <div> Laddar ... </div>;
    }

    if (isError) {
        return <div> Fel vid hämtning av rum </div>;
    }

    return (
        <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            {displayedRooms?.map((room) => {
                return (
                    <li key={room.id}>
                        <RoomCard key={room.id} {...room} />
                    </li>
                );
            })}
        </ul>
    );
}
