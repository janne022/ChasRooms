namespace ChasRooms.Server.Domain.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string RoomName { get; set; } = null!;
        public int Capacity { get; set; }
        public string features { get; set; } = null!;

        ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
