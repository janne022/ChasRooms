import RoomDetailsCard from "@/components/RoomDetailsCard";
import RoomFilter from "@/components/RoomFilter";
import RoomList from "@/components/RoomList";

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
