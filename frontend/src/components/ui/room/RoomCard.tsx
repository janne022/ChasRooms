import React from 'react'
import StatusBadge from './StatusBadge';

// export type EquipmentType =
//   | "TV"
//   | "Whiteboard"
//   | "HDMI-cable"
//   | "Projector"
//   | "Speaker";


interface RoomCardProps  {
  roomNumber: number,
  capacity: number,
  availability: string,
  roomName: string,
  equipment: string[]
}

const RoomCard: React.FC<RoomCardProps> = ({roomName, roomNumber, capacity, availability, equipment}) => {
  return (
    <div data-id={roomNumber}>
      <img className='w-40' src='./public/room.jpg'/>
      <div className='RoomCard__body'>
        <h3>{roomName}</h3>
        <StatusBadge availability={availability} />
        <p>👤 {capacity} pers</p>
        <p>{equipment.join(", ")}</p>
      </div>
      
    </div>
  )
}

export default RoomCard;
