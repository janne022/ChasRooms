import RoomFilter from "@/components/RoomFilter";
import { getAllMockRooms } from "@/services/api";
import { filterValueAtom } from "@/lib/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export default function FilterDemo() {
    const {
        data: rooms,
        isPending,
        isError,
    } = useQuery({
        queryFn: getAllMockRooms,
        queryKey: ["rooms"],
    });
    const filterValue = useAtomValue(filterValueAtom);

    const availableRooms = rooms?.filter((room) => room.availability);
    const displayedRooms = filterValue === "all" ? rooms : availableRooms;

    if (isPending) {
        return <div> Loading ... </div>;
    }

    if (isError) {
        return <div> Error fetching rooms </div>;
    }

    return (
        <div>
            <h1> Filter rooms demo </h1>
            <RoomFilter />
            <ul>
                {displayedRooms?.map((room, index) => (
                    <li key={index}> Room {room.room_number} </li>
                ))}
            </ul>
        </div>
    );
}
