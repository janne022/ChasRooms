import React from 'react'
import StatusBadge from './StatusBadge';
import type { Room } from '@/types/room';

type RoomCardProps = Pick<
  Room,
  "roomName" | "roomNumber" | "capacity" | "availability" | "equipment" | "image"
>;

const RoomCard: React.FC<RoomCardProps> = ({roomName, roomNumber, capacity, availability, equipment, image}) => {
  return (
    <div className='max-w-120 rounded-2xl border border-gray-400'>
      <div className="h-30 sm:h-40 max-w-120 overflow-hidden rounded-t-2xl">
        <img
          src={image || "/room.jpg"}
          alt={`room-${roomNumber}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className='relative p-3'>
        <h3>{roomName}</h3>
        <StatusBadge availability={availability} />
        <p>👤 {capacity} pers</p>
        <p className='text-gray-600'>{equipment.join(", ")}</p>
      </div>
    </div>
  )
}

export default RoomCard;
