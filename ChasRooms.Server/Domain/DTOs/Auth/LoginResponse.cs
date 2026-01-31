using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Domain.DTOs.Auth
{
    public record LoginResponse
    {
        public string? Token { get; set; }
    }
}
