namespace ChasRooms.Server.Domain.Entities
{
    public class Booking
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = null!;
        public DateTime BookingStartTime { get; set; }
        public DateTime BookingEndTime { get; set; }


        public int RoomId { get; set; }
        public Room Room { get; set; } = null!; 
        public string OwnerId { get; set; } = null!;
        public User Owner { get; set; } = null!;

        public ICollection<UserBooking> UserBookings { get; set; } = new List<UserBooking>();

    }
}
