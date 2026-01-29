namespace ChasRooms.Server.Domain.DTOs.Bookings
{
    public class BookingDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime BookingStartTime { get; set; }
        public DateTime BookingEndTime { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; } = string.Empty;
    }
}