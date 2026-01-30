import type { RoomStatus } from "@/types/room";
import type React from "react";
import clsx from "clsx";

export interface StatusBadgeProps {
    status: RoomStatus;
    className?: string;
}

const availabilityColor: Record<RoomStatus, string> = {
    available: "bg-green-400",
    occupied: "bg-red-400",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    return (
        <div
            className={clsx(
                ` absolute top-3 right-2 rounded-2xl p-1.5 ${availabilityColor[status]}`,
                className,
            )}
        >
            <p
                className="inline-flex items-center text-sm font-medium text-white"
                aria-live="polite"
            >
                • {status === "available" ? "Ledig" : "Upptagen"}
            </p>
        </div>
    );
};

export default StatusBadge;
