using ChasRooms.Server.Domain.DTOs.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChasRooms.Server.Infrastructure.Persistance
{
    public class RoomDbContext : IdentityDbContext<User>
    {
        public RoomDbContext(DbContextOptions<RoomDbContext> options) : base(options)
        {

        }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<UserBooking> UserBooking { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Composite key rather than PK for UserBooking
            builder.Entity<UserBooking>()
                .HasKey(ub => new { ub.BookingId, ub.UserId });

            builder.Entity<UserBooking>()
                .HasOne(ub => ub.Booking)
                .WithMany(b => b.UserBookings)
                .HasForeignKey(ub => ub.BookingId);

            builder.Entity<UserBooking>()
                .HasOne(ub => ub.User)
                .WithMany()
                .HasForeignKey(ub => ub.UserId);
        }
    }
}
