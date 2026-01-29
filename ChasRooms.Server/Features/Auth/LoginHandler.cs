using ChasRooms.Server.Domain.DTOs.Auth;
using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Features.Rooms;
using FastEndpoints.Security;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Wolverine.Attributes;

namespace ChasRooms.Server.Features.Auth
{
    public record LoginCommand(GoogleJsonWebSignature.Payload Payload);
    public static class LoginHandler
    {
        [Transactional]
        public static async Task<LoginResponse> Handle(LoginCommand cmd, UserManager<User> userManager, IConfiguration config)
        {
            var user = await userManager.FindByEmailAsync(cmd.Payload.Email);
            bool isNewUser = false;

            if (user is null)
            {
                isNewUser = true;
                user = new User
                {
                    UserName = cmd.Payload.Email,
                    Email = cmd.Payload.Email,
                    FirstName = cmd.Payload.GivenName,
                    LastName = cmd.Payload.FamilyName
                };
                var result = await userManager.CreateAsync(user);

                if (!result.Succeeded)
                {
                    var errorMsg = string.Join(", ", result.Errors.Select(e => e.Description));

                    throw new ApplicationException(errorMsg);
                }
            }
            var jwtToken = JwtBearer.CreateToken(o =>
            {
                o.SigningKey = config["Jwt:Key"];
                o.ExpireAt = DateTime.UtcNow.AddDays(7);
                o.User.Claims.Add(("UserId", user.Id));
                o.User.Claims.Add(("Email", user.Email!));
            });
            return new LoginResponse
            {
                Token = jwtToken,
            };
        }
    }
}
