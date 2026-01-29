using Microsoft.AspNetCore.Identity;

namespace ChasRooms.Server.Domain.DTOs.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public ICollection<UserBooking> UserBookings { get; set; } = new List<UserBooking>();
    }
}
