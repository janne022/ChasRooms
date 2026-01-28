import type React from "react"

//export type AvailabilityType = "Available" | "Occupied" | "Occupied soon" | "Available soon"

export interface StatusBadgeProps {
  availability: string
}


const StatusBadge: React.FC<StatusBadgeProps> = ({availability}) => {
  return (
    <div className='relative top-0 right-0 bg-green-400'>
      <p>{availability}</p>
    </div>
  )
}

export default StatusBadge
