import { UsersIcon } from "lucide-react";
import { Link } from "react-router";
import type { Room } from "@T/room";
import StatusBadge from "@components/room/StatusBadge";
import roomPreviewPlaceholder from "@assets/images/room-preview-placeholder.png";

export default function RoomCard({
    id,
    previewUrl,
    roomName,
    capacity,
    features,
    isOccupied,
}: Room) {
    const status = !isOccupied ? "available" : "occupied";

    return (
        <Link to={`/rooms/${id}`}>
            <div className="card">
                <div className="aspect-3/1">
                    <img
                        src={previewUrl || roomPreviewPlaceholder}
                        alt={`preview of room ${id}`}
                        className="cardImg"
                    />
                </div>
                <div className="relative grid gap-y-2 p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3>{roomName}</h3>
                            <p className="flex items-center">
                                <UsersIcon /> {capacity} pers
                            </p>
                        </div>
                        <StatusBadge status={status} />
                    </div>

                    <p className="text-gray-600">{features}</p>
                </div>
            </div>
        </Link>
    );
}
