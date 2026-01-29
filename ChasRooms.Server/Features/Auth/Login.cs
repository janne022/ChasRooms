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
    public class Login : Endpoint<GoogleLoginRequest, LoginResponse>
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly IMessageBus _messageBus;

        public Login(UserManager<User> userManager, IConfiguration config, IMessageBus messageBus)
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
}
