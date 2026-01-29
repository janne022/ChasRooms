namespace ChasRooms.Server.Features.Bookings.CreateBooking.DTOs
{
    public record CreateBookingResponse
    {
        public Guid BookingId { get; set; }
        public bool Success { get; set; }

        public string Message { get; set; } = null!;
    }
}
