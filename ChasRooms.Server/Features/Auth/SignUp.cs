using ChasRooms.Server.Domain.DTOs.Auth;
using ChasRooms.Server.Domain.Entities;
using FastEndpoints;
using FastEndpoints.Security;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Wolverine;
using Wolverine.Attributes;

namespace ChasRooms.Server.Features.Rooms
{
    public record LoginCommand(GoogleJsonWebSignature.Payload Payload);
    public class SignUp : Endpoint<GoogleLoginRequest, LoginResponse>
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly IMessageBus _messageBus;

        public SignUp(UserManager<User> userManager, IConfiguration config, IMessageBus messageBus)
        {
            _userManager = userManager;
            _config = config;
            _messageBus = messageBus;
        }
        public override void Configure()
        {
            Post("/auth/signup");
            AllowAnonymous();
        }

        public override async Task HandleAsync(GoogleLoginRequest req,CancellationToken ct)
        {
            // Validate token
            GoogleJsonWebSignature.Payload payload;

            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { _config["Google:ClientId"] }
                };
                payload = await GoogleJsonWebSignature.ValidateAsync(req.IdToken, settings);
            }
            catch (Exception)
            {
                ThrowError("Invalid Google Token");
                return;
            }

            try
            {
                var response = await _messageBus.InvokeAsync<LoginResponse>(
                new LoginCommand(payload), ct);

                await Send.OkAsync(response, ct);
            }
            catch (ApplicationException ex)
            {
                ThrowError(ex.Message);
            }
        }
    }

    public static class LoginHandler
    {
        [Transactional]
        public static async Task<LoginResponse> Handle(LoginCommand cmd, UserManager <User> userManager, IConfiguration config)
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
                o.User.Claims.Add(("Email", user.Id));
            });
            return new LoginResponse
            {
                Token = jwtToken,
            };
        }
    }
}
