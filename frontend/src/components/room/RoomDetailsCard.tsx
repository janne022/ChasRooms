import { UsersIcon } from "lucide-react";
import RoomEqupmentList from "./RoomEqupmentList";
import Button from "@components/ui/Button";
import type { RoomById } from "@/types/room";
import roomPreviewPlaceholder from "@assets/images/room-preview-placeholder.png";
import StatusBadge from "./StatusBadge";

type RoomDetailsCardProps = Pick<
    RoomById,
    "id" | "previewUrl" | "name" | "capacity" | "resources" | "isOccupied"
>;

export default function RoomDetailsCard({
    id,
    previewUrl,
    name,
    capacity,
    resources,
    isOccupied,
}: RoomDetailsCardProps) {
    const status = !isOccupied ? "available" : "occupied";

    return (
        <article>
            <img
                className="w-full"
                src={previewUrl || roomPreviewPlaceholder}
                alt=""
            />

            <div className="grid gap-y-4">
                <h2> {name} </h2>
                <StatusBadge status={status} />

                <span className="flex items-center gap-x-2">
                    <UsersIcon />
                    {capacity} Pers
                </span>

                <div>
                    <h3>Resurser: </h3>
                    <RoomEqupmentList equipment={resources} />
                </div>
            </div>

            <Button> Boka Rum </Button>
            <Button> Visa på kartan </Button>
        </article>
    );
}
