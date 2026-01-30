import { capitalizeString } from "@/lib/utils";
import type { RoomStatus } from "@/types/room";
import type React from "react";

export interface StatusBadgeProps {
    status: RoomStatus;
}

const availabilityColor: Record<RoomStatus, string> = {
    available: "bg-green-400",
    occupied: "bg-red-400",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <div className={`rounded-2xl p-1.5 ${availabilityColor[status]}`}>
            <p
                className="inline-flex items-center text-sm font-medium text-white"
                aria-live="polite"
            >
                • {capitalizeString(status)}
            </p>
        </div>
    );
};

export default StatusBadge;
