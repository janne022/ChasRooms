namespace ChasRooms.Server.Features.Rooms.GetRoomById.DTOs
{
    public class RoomDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }
        public List<string> Resources { get; set; } = new List<string>();
        public bool IsOccupied { get; set; }
        public List<BookingSlotDto> Bookings { get; set; } = new List<BookingSlotDto>();
    }
}
