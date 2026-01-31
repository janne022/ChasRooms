using ChasRooms.Server.Features.Bookings.DeleteBooking.DTOs;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using FluentValidation;
using System.Security.Claims;
using Wolverine;
using Wolverine.Attributes;

namespace ChasRooms.Server.Features.Bookings.DeleteBooking
{
    public record DeleteBookingCommand(Guid BookingId, string UserId);

    public class DeleteBookingValidator : Validator<DeleteBookingRequest>
    {
        public DeleteBookingValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Booking ID is required.");
        }
    }

    public class DeleteBookingEndpoint : Endpoint<DeleteBookingRequest, DeleteBookingResponse>
    {
        private readonly IMessageBus _bus;

        public DeleteBookingEndpoint(IMessageBus bus)
        {
            _bus = bus;
        }

        public override void Configure()
        {
            Delete("/bookings/{id}");
            Claims("UserId");
        }

        public override async Task HandleAsync(DeleteBookingRequest req, CancellationToken ct)
        {
            var userId = User.FindFirstValue("UserId");

            if (string.IsNullOrEmpty(userId))
            {
                ThrowError("Could not identify the user");
            }

            var command = new DeleteBookingCommand(req.Id, userId);

            try
            {
                var response = await _bus.InvokeAsync<DeleteBookingResponse>(command, ct);
                await Send.OkAsync(response, ct);
            }
            catch (ApplicationException ex)
            {
                ThrowError(ex.Message);
            }
        }
    }

    public static class DeleteBookingHandler
    {
        [Transactional]
        public static async Task<DeleteBookingResponse> Handle(DeleteBookingCommand cmd, RoomDbContext db, CancellationToken ct)
        {
            var booking = await db.Bookings.FindAsync(new object[] { cmd.BookingId }, ct);

            if (booking == null)
            {
                throw new ApplicationException("Booking not found.");
            }

            if (booking.OwnerId != cmd.UserId)
            {
                throw new ApplicationException("You are not authorized to delete this booking.");
            }

            if (booking.BookingEndTime < DateTime.UtcNow)
            {
                throw new ApplicationException("Cannot delete a booking that has already ended.");
            }

            db.Bookings.Remove(booking);

            return new DeleteBookingResponse
            {
                Success = true,
                Message = "Booking deleted successfully."
            };
        }
    }
}
