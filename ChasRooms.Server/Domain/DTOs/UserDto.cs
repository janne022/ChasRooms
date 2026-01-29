using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Domain.DTOs
{
    public class UserDto
    {
        public required string UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
