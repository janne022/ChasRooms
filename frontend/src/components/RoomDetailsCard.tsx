import { UsersIcon } from "lucide-react";
import RoomEqupmentList from "./RoomEqupmentList";

export default function RoomDetailsCard() {
    return (
        <article>
            <img
                className="w-full"
                src="https://placehold.co/400x200/png"
                alt=""
            />

            <div className="grid gap-y-4">
                <div className="flex justify-between">
                    <h2>Room Name</h2> <span>Status Badge</span>
                </div>

                <span className="flex items-center gap-x-2">
                    <UsersIcon />
                    42 People
                </span>

                <div>
                    <h3>Resurser: </h3>
                    <RoomEqupmentList equipment={["Room", "Stuff"]} />
                </div>
            </div>
        </article>
    );
}
