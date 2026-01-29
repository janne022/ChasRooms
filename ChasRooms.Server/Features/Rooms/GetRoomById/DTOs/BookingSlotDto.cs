namespace ChasRooms.Server.Features.Rooms.GetRoomById.DTOs
{
    public class BookingSlotDto
    {
        public Guid Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
