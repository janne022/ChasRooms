import type { RoomStatus } from "@T/room";
import clsx from "clsx";

export interface StatusBadgeProps {
    status: RoomStatus;
    className?: string;
}

const availabilityColor: Record<RoomStatus, string> = {
    available: "bg-green-400",
    occupied: "bg-red-400",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const badgeText = status === "available" ? "Ledig" : "Upptagen";

    return (
        <div
            className={clsx(
                `absolute top-3 right-2 rounded-2xl p-1.5 ${availabilityColor[status]}`,
                className,
            )}
        >
            <p
                className="inline-flex items-center text-sm font-medium text-white"
                aria-live="polite"
            >
                • {badgeText}
            </p>
        </div>
    );
}
