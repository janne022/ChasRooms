import RoomCard from "@/components/ui/room/RoomCard";
import rooms from "@lib/rooms_mock_data.json";


export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            {rooms.map(room => (
                <RoomCard {...room} key={room.roomNumber}/>
            ))}
        </div>
    );
}
