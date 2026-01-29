using ChasRooms.Server.Domain.DTOs;
using ChasRooms.Server.Domain.Entities;

namespace ChasRooms.Server.Features.Bookings.ViewMyBookings.DTOs
{
    public class ViewMyBookingsResponse
    {
        public List<BookingDto> Bookings { get; set; } = new List<BookingDto>();
    }
}
