import type { AvailabilityType } from "@/types/room"
import type React from "react"

export interface StatusBadgeProps {
  availability: AvailabilityType
}

const availabilityColor: Record<AvailabilityType, string> = {
  Available: "bg-green-300",
  Occupied: "bg-red-400",
  "Occupied soon": "bg-orange-300",
  "Available soon": "bg-yellow-200",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({availability}) => {
  return (
    <div 
      className={`absolute top-3 right-2 p-1.5 rounded-2xl ${availabilityColor[availability]}`}
      aria-label={`Room status: ${availability}`}
    >
      <p className="text-sm font-medium inline-flex items-center"> • {availability}</p>
    </div>
  )
}

export default StatusBadge
