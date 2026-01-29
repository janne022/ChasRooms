using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Features.Bookings.CreateBooking.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using FastEndpoints.Security;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using Wolverine;
using Wolverine.Attributes;
using static Google.Apis.Requests.BatchRequest;

namespace ChasRooms.Server.Features.Bookings.CreateBooking
{
    public record CreateBookingCommand(
      int RoomId,
      string UserId,
      string Name,
      string Description,
      DateTime StartTime,
      DateTime EndTime);

    public class CreateBookingValidator : Validator<CreateBookingRequest>
    {
        public CreateBookingValidator()
        {
            RuleFor(x => x.RoomId)
                .GreaterThan(0)
                .WithMessage("Choose a valid room.");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Your booking needs to have a name.");

            RuleFor(x => x.StartTime)
                .GreaterThan(DateTime.Now)
                .WithMessage("You cannot book the room in the past (no time traveling at Chas)!");

            RuleFor(x => x.EndTime)
                .GreaterThan(x => x.StartTime)
                .WithMessage("The end time must be AFTER the start time");

            RuleFor(x => x)
                .Must(x => (x.EndTime - x.StartTime).TotalHours <= 3)
                .WithMessage("A booking can be max 3 hours long.");
        }
    }
    public class CreateBookingEndpoint : Endpoint<CreateBookingRequest, CreateBookingResponse>
    {
        private readonly IMessageBus _bus;

        public CreateBookingEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Post("/bookings/createbooking");
            Claims("UserId");
        }

        public override async Task HandleAsync(CreateBookingRequest req, CancellationToken ct)
        {
            var userId = User.FindFirstValue("UserId");

            if (string.IsNullOrEmpty(userId))
            {
                ThrowError("Could not identify the user");
            }

            var command = new CreateBookingCommand(
                req.RoomId,
                userId,
                req.Name,
                req.Description,
                req.StartTime,
                req.EndTime
            );

            try
            {
            var response = await _bus.InvokeAsync<CreateBookingResponse>(command, ct);
            await Send.OkAsync(response, ct);
            }
            catch (ApplicationException ex)
            {
                ThrowError(ex.Message);
            }
        }
    }
    public static class CreateBookingHandler
    {
        [Transactional]
        public static async Task<CreateBookingResponse> Handle(CreateBookingCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var roomExists = await db.Rooms.AnyAsync(r => r.Id == cmd.RoomId, ct);

            if (!roomExists)
            {
                throw new ApplicationException("The specified room does not exist.");
            }

            var isOccupied = await db.Bookings.AnyAsync(b =>
            b.RoomId == cmd.RoomId &&
            cmd.StartTime < b.BookingEndTime &&
            cmd.EndTime > b.BookingStartTime,
            ct);

            if (isOccupied)
            {
                throw new ApplicationException("Someone has already booked this room at this time, or within your requested time period.");
            }

            var booking = new Booking
            {
                Id = Guid.NewGuid(),
                RoomId = cmd.RoomId,
                OwnerId = cmd.UserId,
                Name = cmd.Name,
                Description = cmd.Description,
                BookingStartTime = cmd.StartTime,
                BookingEndTime = cmd.EndTime
            };

            

            db.Bookings.Add(booking);

            return new CreateBookingResponse
            {
                BookingId = booking.Id,
                Message = "Booking successful!",
                Success = true
            };
        }
    }
}
