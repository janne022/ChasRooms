using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using Wolverine;
using Wolverine.Attributes;
using Wolverine.Runtime;
using Microsoft.EntityFrameworkCore;

namespace ChasRooms.Server.Features.Bookings.GetBooking
{
    public record GetBookingRequest()
    {
        public Guid Id {  get; init; }
    }
    public record GetBookingCommand(Guid Id);
    public class GetBooking : Endpoint<GetBookingRequest, BookingDto>
    {
        private readonly IMessageBus _bus;
        public GetBooking(IMessageBus bus)
        {
            _bus = bus;
        }
        public override void Configure()
        {
            Get("/bookings/{id}");
            Claims("UserId");
        }

        public override async Task HandleAsync(GetBookingRequest req,CancellationToken ct)
        {
            var result = await _bus.InvokeAsync<BookingDto?>(
                            new GetBookingCommand(req.Id), ct);

            if (result is null)
            {
                await Send.NotFoundAsync(ct);
                return;
            }

            await Send.OkAsync(result, ct);
        }
    }

    public static class GetBookingHandler
    {
        [Transactional]
        public static async Task<BookingDto?> Handle(GetBookingCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            return await db.Bookings
                .Where(b => b.Id == cmd.Id)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Description = b.Description,
                    BookingStartTime = b.BookingStartTime,
                    BookingEndTime = b.BookingEndTime,
                    Room = new RoomDto
                    {
                        Id = b.Room.Id,
                        RoomName = b.Room.RoomName,
                        Capacity = b.Room.Capacity,
                        Features = b.Room.Features
                    },
                    Users = b.UserBookings.Select(ub => new UserDto
                    {
                        UserId = ub.User.Id,
                        FirstName = ub.User.FirstName,
                        LastName = ub.User.LastName,
                    }).ToList()
                }).FirstOrDefaultAsync(ct);
        }
    }
}
