using Microsoft.AspNetCore.Identity;

namespace Piglin-Brutes-Hackathon.Server.Domain.Entities
{
    public class User : IdentityUser
    {
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;

    ICollection<UserBooking> UserBookings { get; set; } = new List<UserBooking>();
    }
}
