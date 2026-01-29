using ChasRooms.Server.Domain.DTOs.Auth;
using ChasRooms.Server.Features.Auth;
using ChasRooms.Server.Features.Rooms;
using FastEndpoints;
using Google.Apis.Auth;
using Wolverine;

namespace ChasRooms.Server.Domain.Entities.Features.Auth
{
    public class DevLogin : EndpointWithoutRequest<LoginResponse>
    {
        private readonly IMessageBus _messageBus;
        private readonly IWebHostEnvironment _env;

        public DevLogin(IMessageBus messageBus, IWebHostEnvironment env)
        {
            _messageBus = messageBus;
            _env = env;
        }

        public override void Configure()
        {
            Post("/auth/dev");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            if (!_env.IsDevelopment())
            {
                await Send.NotFoundAsync(ct);
                return;
            }

            // Create fake payload
            var fakePayload = new GoogleJsonWebSignature.Payload
            {
                Email = "developer@chasrooms.com",
                GivenName = "Dev",
                FamilyName = "Eloper",
                Subject = "dev_user_123456",
                Issuer = "accounts.google.com",
            };

            var response = await _messageBus.InvokeAsync<LoginResponse>(
                new LoginCommand(fakePayload), ct);

            await Send.OkAsync(response, ct);
        }
    }
}