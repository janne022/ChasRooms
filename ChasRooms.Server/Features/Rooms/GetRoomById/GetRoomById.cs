using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Features.Rooms.GetRoomById.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Wolverine;

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
            var now = DateTime.UtcNow;

            var room = await db.Rooms
                .Where(r => r.Id == cmd.Id)
                .Select(r => new
                {
                    Room = r,
                    IsOccupied = r.Bookings.Any(b =>
                    b.BookingStartTime <= now &&
                    b.BookingEndTime > now),
                    ActiveBookings = r.Bookings
                    .Where(b => b.BookingEndTime >= now)
                    .OrderBy(b => b.BookingStartTime)
                    .Select(b => new BookingSlotDto
                    {
                        Id = b.Id,
                        Start = b.BookingStartTime,
                        End = b.BookingEndTime
                    }).ToList()
            }).FirstOrDefaultAsync(ct);

            if (room == null)
            {
                return null;
            }

            return new RoomDetailsDto
            {
                Id = room.Room.Id,
                Name = room.Room.RoomName,
                Capacity = room.Room.Capacity,
                IsOccupied = room.IsOccupied,
                Resources = string.IsNullOrEmpty(room.Room.Features)
                            ? new List<string>()
                            : room.Room.Features.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList(),
                Bookings = room.ActiveBookings
            };
        }
    }
}