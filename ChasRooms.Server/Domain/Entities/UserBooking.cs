namespace ChasRooms.Server.Domain.Entities
{
    public class UserBooking
    {
        public Guid BookingId { get; set; }
        public Booking Booking { get; set; } = null!;

        public User User { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
