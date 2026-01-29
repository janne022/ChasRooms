using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Domain.DTOs
{
    public class BookingDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime BookingStartTime { get; set; }
        public DateTime BookingEndTime { get; set; }
        public RoomDto Room { get; set; } = null!;
        public List<UserDto> Users { get; set; } = null!;
    }
}