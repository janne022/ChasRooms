import RoomFilter from "@/components/room/RoomFilter";
import RoomList from "@/components/room/RoomList";

export default function Home() {
    return (
        <div className="p-3">
            <h1 className="text-xl font-bold">Hitta ett studie rum</h1>
            <RoomFilter />
            <RoomList />
        </div>
    );
}
