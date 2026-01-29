import { UsersIcon } from "lucide-react";
import RoomEqupmentList from "./RoomEqupmentList";

type RoomDetailsCardProps = {
    preview: string;
    name: string;
    isAvailable: boolean;
    peopleNumber: number;
    equipment: string[];
};

export default function RoomDetailsCard({
    preview,
    name,
    isAvailable,
    peopleNumber,
    equipment,
}: RoomDetailsCardProps) {
    return (
        <article>
            <img className="w-full" src={preview} alt="" />

            <div className="grid gap-y-4">
                <div className="flex justify-between">
                    <h2>{name}</h2> <span>{isAvailable}</span>
                </div>

                <span className="flex items-center gap-x-2">
                    <UsersIcon />
                    {peopleNumber} People
                </span>

                <div>
                    <h3>Resurser: </h3>
                    <RoomEqupmentList equipment={equipment} />
                </div>
            </div>
        </article>
    );
}
