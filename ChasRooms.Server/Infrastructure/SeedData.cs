using Bogus;
using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace ChasRooms.Server.Infrastructure
{
    public static class SeedData
    {
        public static async Task InitializeAsync(RoomDbContext context)
        {
            if (await context.Rooms.AnyAsync())
            {
                return;
            }

            int roomNumber = 101;
            var roomFaker = new Faker<Room>()
                .RuleFor(r => r.RoomName, f => $"Study Room {roomNumber++}")
                .RuleFor(r => r.Capacity, f => f.Random.Int(4, 8))
                .RuleFor(r => r.Features, f => f.PickRandom(new[] { "Whiteboard, TV", "Projector", "Sound System, TV", "Whiteboard", "TV, Video Conference" }));

            var rooms = roomFaker.Generate(7);

            await context.Rooms.AddRangeAsync(rooms);
            await context.SaveChangesAsync();
        }
    }
}
