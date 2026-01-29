using Microsoft.EntityFrameworkCore;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using Wolverine;
using ChasRooms.Server.Features.Rooms.GetRoomById.DTOs;

namespace ChasRooms.Server.Features.Rooms.GetRoomById
{
    public record GetRoomByIdCommand(int Id);

    public class GetRoomByIdEndpoint : Endpoint<GetRoomByIdRequest, GetRoomByIdResponse>
    {
        private readonly IMessageBus _bus;

        public GetRoomByIdEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Get("/rooms/{Id}");
            Claims("UserId");
        }

        public override async Task HandleAsync(GetRoomByIdRequest req, CancellationToken ct)
        {
            var command = new GetRoomByIdCommand(req.Id);

            var room = await _bus.InvokeAsync<RoomDetailsDto?>(command, ct);

            if (room is null)
            {
                await Send.NotFoundAsync(ct);
                return;
            }

            await Send.OkAsync(new GetRoomByIdResponse
            {
                Room = room
            }, ct);
        }
    }

    public static class GetRoomByIdHandler
    {
        public static async Task<RoomDetailsDto?> Handle(GetRoomByIdCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var now = DateTime.Now;

            var room = await db.Rooms.Include(r => r.Bookings).FirstOrDefaultAsync(r => r.Id == cmd.Id, ct);

            if (room == null)
            {
                return null;
            }

            return new RoomDetailsDto
            {
                Id = room.Id,
                Name = room.RoomName,
                Capacity = room.Capacity,
                IsOccupied = room.Bookings.Any(b =>
                    b.BookingStartTime <= now &&
                    b.BookingEndTime > now),
                Resources = string.IsNullOrEmpty(room.Features)
                    ? new List<string>()
                    : room.Features.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                Bookings = room.Bookings
                    .Where(b => b.BookingEndTime >= now)
                    .OrderBy(b => b.BookingStartTime)
                    .Select(b => new BookingSlotDto
                    {
                        Start = b.BookingStartTime,
                        End = b.BookingEndTime
                    })
                    .ToList()
            };
        }
    }
}