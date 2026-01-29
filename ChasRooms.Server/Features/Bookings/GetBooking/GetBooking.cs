using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using Wolverine;
using Wolverine.Attributes;
using Wolverine.Runtime;
using Microsoft.EntityFrameworkCore;

namespace ChasRooms.Server.Features.Bookings.GetBooking
{
    public record GetBookingCommand(Guid Id);
    public class GetBooking : EndpointWithoutRequest<BookingDto>
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

        public override async Task HandleAsync(CancellationToken ct)
        {
            Guid id = Route<Guid>("id");
            try
            {
                var result = await _bus.InvokeAsync<BookingDto>(
                    new GetBookingCommand(id), ct);
                await Send.OkAsync(result, ct);
            }
            catch (ApplicationException ex)
            {
                ThrowError(ex.Message);
            }
        }
    }

    public static class GetBookingHandler
    {
        [Transactional]
        public static async Task<BookingDto> Handle(GetBookingCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var booking = await db.Bookings
                .Include(b => b.Room)
                .Include(b => b.UserBookings)
                    .ThenInclude(ub => ub.User)
                .FirstOrDefaultAsync(b => b.Id == cmd.Id, ct);

            return booking is null
                ? throw new ApplicationException($"Found no booking with the id: {cmd.Id}")
                : new BookingDto
            {
                Id = booking.Id,
                Name = booking.Name,
                Description = booking.Description,
                BookingStartTime = booking.BookingStartTime,
                BookingEndTime = booking.BookingEndTime,
                Room = new RoomDto
                {
                    Id = booking.Room.Id,
                    Capacity = booking.Room.Capacity,
                    Features = booking.Room.Features,
                    RoomName = booking.Room.RoomName
                },
                Users = [.. booking.UserBookings.Select(ub => new UserDto
                {
                    UserId = ub.User.Id,
                    FirstName = ub.User.FirstName,
                    LastName = ub.User.LastName,
                })],
            };
        }
    }
}
