namespace ChasRooms.Server.Features.Bookings.InviteUserToBooking.DTOs
{
    public class InviteUserToBookingRequest
    {
        public Guid BookingId { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}
