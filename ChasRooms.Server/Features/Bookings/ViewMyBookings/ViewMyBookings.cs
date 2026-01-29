using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Features.Bookings.ViewMyBookings.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using Wolverine;
using YamlDotNet.Core.Events;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ChasRooms.Server.Features.Bookings.ViewMyBookings
{
    public record ViewMyBookingsCommand(string UserId);

    public class ViewMyBookingsEndpoint : EndpointWithoutRequest<ViewMyBookingsResponse>
    {
        private readonly IMessageBus _bus;

        public ViewMyBookingsEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Get("/bookings/my");
            Claims("UserId");
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var user = User.FindFirstValue("UserId");

            if (string.IsNullOrEmpty(user))
            {
                ThrowError("The userId is invalid.");
            }

            var command = new ViewMyBookingsCommand(user);

            var bookings = await _bus.InvokeAsync<List<BookingDto>>(command, ct);

            await Send.OkAsync(new ViewMyBookingsResponse
            {
                Bookings = bookings
            }, ct);
        }
    }
    public static class ViewMyBookingsHandler
    {
        public static async Task<List<BookingDto>> Handle(ViewMyBookingsCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            return await db.Bookings
                .Where(b => b.OwnerId == cmd.UserId)
                .OrderBy(b => b.BookingStartTime)
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
                        Capacity = b.Room.Capacity,
                        Features = b.Room.Features,
                        RoomName = b.Room.RoomName
                    },
                    Users = b.UserBookings.Select(ub => new UserDto
                    {
                        UserId = ub.User.Id,
                        FirstName = ub.User.FirstName,
                        LastName = ub.User.LastName,
                    }).ToList(),
                }).ToListAsync(ct);
        }
    }
}
