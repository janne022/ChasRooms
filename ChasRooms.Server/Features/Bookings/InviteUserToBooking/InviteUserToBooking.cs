using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Features.Bookings.InviteUserToBooking.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Wolverine;
using Wolverine.Attributes;

namespace ChasRooms.Server.Features.Bookings.InviteUserToBooking
{
    public record InviteUserToBookingCommand(Guid BookingId, string OwnerId, string Email);

    public class InviteUserToBookingValidator : Validator<InviteUserToBookingRequest>
    {
        public InviteUserToBookingValidator()
        {
            RuleFor(x => x.BookingId)
                .NotEmpty()
                .WithMessage("Booking ID is required.");

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("A valid email address is required.");
        }
    }

    public class InviteUserToBookingEndpoint : Endpoint<InviteUserToBookingRequest, InviteUserToBookingResponse>
    {
        private readonly IMessageBus _bus;

        public InviteUserToBookingEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Post("/bookings/invite");
            Claims("UserId");
        }

        public override async Task HandleAsync(InviteUserToBookingRequest req, CancellationToken ct)
        {
            var userId = User.FindFirstValue("UserId");

            if (string.IsNullOrEmpty(userId))
            {
                ThrowError("Could not identify the user");
            }

            var command = new InviteUserToBookingCommand(req.BookingId, userId, req.Email);

            try
            {
                var response = await _bus.InvokeAsync<InviteUserToBookingResponse>(command, ct);
                await Send.OkAsync(response, ct);
            }
            catch (ApplicationException ex)
            {
                ThrowError(ex.Message);
            }
        }
    }

    public static class InviteUserToBookingHandler
    {
        [Transactional]
        public static async Task<InviteUserToBookingResponse> Handle(InviteUserToBookingCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var booking = await db.Bookings
                .Include(b => b.UserBookings)
                .Include(b => b.Room)
                .FirstOrDefaultAsync(b => b.Id == cmd.BookingId, ct);

            if (booking == null)
            {
                throw new ApplicationException("Booking not found.");
            }

            if (booking.OwnerId != cmd.OwnerId)
            {
                throw new ApplicationException("You are not authorized to invite users to this booking.");
            }

            var userToInvite = await db.Users.FirstOrDefaultAsync(u => u.Email == cmd.Email, ct);

            if (userToInvite == null)
            {
                throw new ApplicationException("User with this email not found.");
            }

            if (booking.UserBookings.Any(ub => ub.UserId == userToInvite.Id))
            {
                throw new ApplicationException("User is already added to this booking.");
            }

            // Check if adding another user would exceed room capacity
            // +1 for the owner who is not in UserBookings, +1 for the user we're adding
            var currentParticipants = booking.UserBookings.Count + 1;
            if (currentParticipants + 1 > booking.Room.Capacity)
            {
                throw new ApplicationException($"Cannot invite more users. Room capacity ({booking.Room.Capacity}) would be exceeded.");
            }

            booking.UserBookings.Add(new UserBooking
            {
                BookingId = booking.Id,
                UserId = userToInvite.Id
            });

            return new InviteUserToBookingResponse
            {
                Success = true,
                Message = $"User {userToInvite.Email} invited successfully."
            };
        }
    }
}
