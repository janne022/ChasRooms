using Microsoft.EntityFrameworkCore;
using Wolverine;
using FastEndpoints;
using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using ChasRooms.Server.Features.Rooms.GetAllRooms.DTOs;

namespace ChasRooms.Server.Features.Rooms.GetAllRooms
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
            Claims("UserId");
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

            var roomDataList = await dbQuery
                .Select(r => new
                {
                    Room = r,
                    IsOccupied = db.Bookings.Any(b =>
                        b.RoomId == r.Id &&
                        b.BookingStartTime <= now &&
                        b.BookingEndTime > now)
                })
                .ToListAsync(ct);

            return roomDataList.Select(rd => new RoomDto
            {
                Id = rd.Room.Id,
                RoomName = rd.Room.RoomName,
                Capacity = rd.Room.Capacity,
                Features = rd.Room.Features,
                IsOccupied = rd.IsOccupied
            }).ToList();
        }
    }
}