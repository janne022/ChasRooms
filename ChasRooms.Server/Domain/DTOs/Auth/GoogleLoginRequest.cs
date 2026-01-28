using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Domain.DTOs.Auth
{
    public record GoogleLoginRequest
    {
        public required string IdToken { get; set; }
    }
}
