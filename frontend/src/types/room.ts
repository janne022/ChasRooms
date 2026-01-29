export type AvailabilityType = 
  | "Available" 
  | "Occupied" 
  | "Occupied soon" 
  | "Available soon"

export type EquipmentType =
  | "TV"
  | "Whiteboard"
  | "HDMI-cable"
  | "Projector"
  | "Speaker";


export interface Room  {
  roomNumber: number,
  capacity: number,
  availability: AvailabilityType,
  roomName: string,
  equipment: EquipmentType[],
  image: string
}

