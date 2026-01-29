namespace ChasRooms.Server.Domain.DTOs
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }
        public List<string> Resources { get; set; } = new();
        public bool IsOccupied { get; set; }
    }
}
