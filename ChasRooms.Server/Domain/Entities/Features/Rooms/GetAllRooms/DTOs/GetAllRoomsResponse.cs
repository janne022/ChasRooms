using ChasRooms.Server.Domain.DTOs;

namespace ChasRooms.Server.Domain.Entities.Features.Rooms.GetAllRooms.DTOs
{
    public class GetAllRoomsResponse
    {
        public List<RoomDto> Rooms { get; set; } = new List<RoomDto>();
    }
}
