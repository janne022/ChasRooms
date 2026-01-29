import RoomDetailsCard from "@/components/room/RoomDetailsCard";
import RoomFilter from "@/components/room/RoomFilter";
import RoomList from "@/components/room/RoomList";

export default function ComponentDemo() {
    return (
        <div>
            <h1> Component Demo </h1>

            <RoomDetailsCard
                preview="https://placehold.co/400x200/png"
                name="Room Name"
                isAvailable={true}
                peopleNumber={42}
                equipment={["Room", "Stuff"]}
            />
            <RoomFilter />
            <RoomList />
        </div>
    );
}
