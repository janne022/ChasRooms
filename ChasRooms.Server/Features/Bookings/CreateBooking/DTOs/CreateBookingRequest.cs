namespace ChasRooms.Server.Features.Bookings.CreateBooking.DTOs
{
    public record CreateBookingRequest
    {
        public int RoomId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
