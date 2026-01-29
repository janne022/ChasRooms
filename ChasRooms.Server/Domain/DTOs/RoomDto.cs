using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Domain.DTOs
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string RoomName { get; set; } = null!;
        public int Capacity { get; set; }
        public string Features { get; set; } = null!;
    }
}
