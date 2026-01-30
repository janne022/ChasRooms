import RoomFilter from "@/components/room/RoomFilter";
import RoomList from "@/components/room/RoomList";

export default function Home() {
    return (
        <>
            <h1 className="text-xl">Hitta ett studie rum</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <RoomFilter />
            <RoomList />
        </>
    );
}
