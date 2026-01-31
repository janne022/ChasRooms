import React from "react";
import StatusBadge from "./StatusBadge";
import type { Room } from "@/types/room";
import { UsersIcon } from "lucide-react";
import { Link } from "react-router";
import roomPreviewPlaceholder from "@assets/images/room-preview-placeholder.png";

type RoomCardProps = Room;

const RoomCard: React.FC<RoomCardProps> = ({
    id,
    previewUrl,
    roomName,
    capacity,
    features,
    isOccupied,
}: RoomCardProps) => {
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
};

export default RoomCard;
