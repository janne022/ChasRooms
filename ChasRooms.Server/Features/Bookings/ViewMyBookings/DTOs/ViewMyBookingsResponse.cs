using ChasRooms.Server.Domain.DTOs.Bookings;

namespace ChasRooms.Server.Features.Bookings.ViewMyBookings.DTOs
{
    public class ViewMyBookingsResponse
    {
        public List<BookingDto> Bookings { get; set; } = new List<BookingDto>();
    }
}
