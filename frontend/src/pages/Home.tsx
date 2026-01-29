import RoomCard from "@/components/room/RoomCard";
import type { Room } from "@/types/room";
import roomsData from "@/data/rooms_mock_data.json";


export default function Home() {
    const rooms = roomsData as Room[];
    return (
        <main className="p-5">
            <h1 className="text-xl p-2">Home</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 sm: justify-center">
                {rooms.map(room => (
                    <RoomCard key={room.roomNumber} {...room} />
                ))}
            </div>
        </main>
    );
}
