using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Infrastructure.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ChasRooms.Server.Infrastructure
{
    public static class SeedData
    {
        public static async Task InitializeAsync(RoomDbContext context, UserManager<User> userManager)
        {
            // Seed rooms
            if (!await context.Rooms.AnyAsync())
            {
                var rooms = new List<Room>
                {
                    new Room
                    {
                        RoomName = "The Nether Portal",
                        Capacity = 2,
                        Features = "1 bord, 2 stolar"
                    },
                    new Room
                    {
                        RoomName = "Ender Dragon's Lair",
                        Capacity = 4,
                        Features = "1 bord, 4 stolar, 1 liten skärm"
                    },
                    new Room
                    {
                        RoomName = "Redstone Chamber",
                        Capacity = 4,
                        Features = "1 stort bord, 4 stolar"
                    },
                    new Room
                    {
                        RoomName = "The Stronghold",
                        Capacity = 4,
                        Features = "1 TV, 4 kontorsstolar, stort bord, luftigt"
                    },
                    new Room
                    {
                        RoomName = "Diamond Mine",
                        Capacity = 4,
                        Features = "1 TV, 4 kontorsstolar, stort bord, luftigt"
                    },
                    new Room
                    {
                        RoomName = "Kladdkaka",
                        Capacity = 4,
                        Features = "1 TV, 4 kontorsstolar, stort bord, luftigt, whiteboard"
                    }
                };

                await context.Rooms.AddRangeAsync(rooms);
                await context.SaveChangesAsync();
            }

            // Seed users
            var users = new List<User>();
            var userInfos = new[]
            {
                ("erik.svensson@chas.se", "Erik", "Svensson"),
                ("anna.lindberg@chas.se", "Anna", "Lindberg"),
                ("johan.berg@chas.se", "Johan", "Berg"),
                ("maria.andersson@chas.se", "Maria", "Andersson"),
                ("karl.nilsson@chas.se", "Karl", "Nilsson")
            };

            foreach (var (email, firstName, lastName) in userInfos)
            {
                var existingUser = await userManager.FindByEmailAsync(email);
                if (existingUser == null)
                {
                    var user = new User
                    {
                        UserName = email,
                        Email = email,
                        FirstName = firstName,
                        LastName = lastName,
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(user, "Test123!");
                    users.Add(user);
                }
                else
                {
                    users.Add(existingUser);
                }
            }

            // Seed bookings
            if (!await context.Bookings.AnyAsync())
            {
                var allRooms = await context.Rooms.ToListAsync();

                var bookings = new List<Booking>
                {
                    // 2026-01-29 (gamla bokningar)
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Morgonmöte",
                        Description = "Daglig standup med utvecklingsteamet",
                        BookingStartTime = new DateTime(2026, 1, 29, 9, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 29, 10, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[0].Id,
                        OwnerId = users[0].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Kundpresentation",
                        Description = "Presentation av nya funktioner för kund",
                        BookingStartTime = new DateTime(2026, 1, 29, 13, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 29, 15, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[2].Id,
                        OwnerId = users[1].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Kodgranskning",
                        Description = "Genomgång av sprint-kod med teamet",
                        BookingStartTime = new DateTime(2026, 1, 29, 15, 30, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 29, 17, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[1].Id,
                        OwnerId = users[2].Id
                    },

                    // 2026-01-30 (idag)
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Planeringsmöte",
                        Description = "Sprintplanering för kommande vecka",
                        BookingStartTime = new DateTime(2026, 1, 30, 9, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 30, 11, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[3].Id,
                        OwnerId = users[0].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Designworkshop",
                        Description = "Brainstorming för ny UX-design",
                        BookingStartTime = new DateTime(2026, 1, 30, 11, 30, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 30, 13, 30, 0, DateTimeKind.Utc),
                        RoomId = allRooms[5].Id,
                        OwnerId = users[3].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Teknikdiskussion",
                        Description = "Genomgång av arkitekturbeslut",
                        BookingStartTime = new DateTime(2026, 1, 30, 14, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 30, 16, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[4].Id,
                        OwnerId = users[2].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Snabbmöte",
                        Description = "Kort avstämning om buggfixar",
                        BookingStartTime = new DateTime(2026, 1, 30, 16, 30, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 30, 17, 30, 0, DateTimeKind.Utc),
                        RoomId = allRooms[0].Id,
                        OwnerId = users[4].Id
                    },

                    // 2026-01-31 (imorgon)
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Retrospektiv",
                        Description = "Sprint retrospektiv med hela teamet",
                        BookingStartTime = new DateTime(2026, 1, 31, 10, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 31, 12, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[5].Id,
                        OwnerId = users[1].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Intervju",
                        Description = "Teknisk intervju med kandidat",
                        BookingStartTime = new DateTime(2026, 1, 31, 13, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 31, 14, 30, 0, DateTimeKind.Utc),
                        RoomId = allRooms[2].Id,
                        OwnerId = users[0].Id
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        Name = "Utbildning",
                        Description = "Intern utbildning om nya verktyg",
                        BookingStartTime = new DateTime(2026, 1, 31, 15, 0, 0, DateTimeKind.Utc),
                        BookingEndTime = new DateTime(2026, 1, 31, 18, 0, 0, DateTimeKind.Utc),
                        RoomId = allRooms[3].Id,
                        OwnerId = users[3].Id
                    }
                };

                // Add UserBookings for each booking (owner is always a participant)
                foreach (var booking in bookings)
                {
                    booking.UserBookings.Add(new UserBooking
                    {
                        UserId = booking.OwnerId
                    });
                }

                // Add some extra participants to some bookings
                bookings[3].UserBookings.Add(new UserBooking { UserId = users[1].Id }); // Planeringsmöte
                bookings[3].UserBookings.Add(new UserBooking { UserId = users[2].Id });
                bookings[4].UserBookings.Add(new UserBooking { UserId = users[0].Id }); // Designworkshop
                bookings[7].UserBookings.Add(new UserBooking { UserId = users[2].Id }); // Retrospektiv
                bookings[7].UserBookings.Add(new UserBooking { UserId = users[3].Id });
                bookings[7].UserBookings.Add(new UserBooking { UserId = users[4].Id });

                await context.Bookings.AddRangeAsync(bookings);
                await context.SaveChangesAsync();
            }
        }
    }
}
