using Microsoft.EntityFrameworkCore;
using Wolverine;
using FastEndpoints;
using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Domain.Entities.Features.Rooms.GetAllRooms.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;

namespace ChasRooms.Server.Domain.Entities.Features.Rooms.GetAllRooms
{
    public record GetAllRoomsCommand(bool AvailableOnly);

    public class GetAllRoomsEndpoint : Endpoint<GetAllRoomsRequest, GetAllRoomsResponse>
    {
        private readonly IMessageBus _bus;

        public GetAllRoomsEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Get("/rooms");
            AllowAnonymous();
        }

        public override async Task HandleAsync(GetAllRoomsRequest req, CancellationToken ct)
        {
            var command = new GetAllRoomsCommand(req.AvailableOnly);

            var rooms = await _bus.InvokeAsync<List<RoomDto>>(command, ct);

            await Send.OkAsync(new GetAllRoomsResponse
            {
                Rooms = rooms
            }, ct);
        }
    }

    public static class GetAllRoomsHandler
    {
        public static async Task<List<RoomDto>> Handle(GetAllRoomsCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var now = DateTime.UtcNow;

            var dbQuery = db.Rooms.AsQueryable();

            if (cmd.AvailableOnly)
            {
                dbQuery = dbQuery.Where(r => !db.Bookings.Any(b =>
                    b.RoomId == r.Id &&
                    b.BookingStartTime <= now &&
                    b.BookingEndTime > now));
            }

            var rooms = await dbQuery.ToListAsync(ct);

            return rooms.Select(r => new RoomDto
            {
                Id = r.Id,
                Name = r.RoomName,
                Capacity = r.Capacity,
                Resources = string.IsNullOrEmpty(r.Features)
                            ? new List<string>()
                            : r.Features.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),

                IsOccupied = db.Bookings.Any(b =>
                    b.RoomId == r.Id &&
                    b.BookingStartTime <= now &&
                    b.BookingEndTime > now)
            }).ToList();
        }
    }
}