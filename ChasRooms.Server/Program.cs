using ChasRooms.Server.Infrastructure;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using FastEndpoints.Swagger;
using FastEndpoints.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using Wolverine;
using Wolverine.EntityFrameworkCore;
using Wolverine.Postgresql;
using ChasRooms.Server.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();
builder.AddRedisClientBuilder("cache")
    .WithOutputCache();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("chasrooms-db");

// Postgres integration
builder.Services.AddDbContextWithWolverineIntegration<RoomDbContext>(options => options.UseNpgsql(connectionString));

// Wolverine options
builder.Host.UseWolverine(opt =>
{
    opt.PersistMessagesWithPostgresql(connectionString!);
    opt.UseEntityFrameworkCoreTransactions();
    opt.Policies.UseDurableInboxOnAllListeners();
    opt.Policies.UseDurableOutboxOnAllSendingEndpoints();
});

// Fastendpoints and Swagger
builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument(o =>
{
    o.DocumentSettings = s =>
    {
        s.Title = "ChasRooms API";
        s.Version = "v1";
        s.Description = "APIs for ChasRooms";

    };
});

// Auth
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<RoomDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

builder.Services.AddAuthenticationJwtBearer(s => s.SigningKey = builder.Configuration["Jwt:Key"]!);

// Prevent redirection to a login page (which doesn't exist) when unauthorized, return 401 instead
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthorization();

// Cors fix to allow localhost
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin => true) // Allow any origin for development
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Often needed for auth cookies/headers
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseOutputCache();

app.MapDefaultEndpoints();

app.UseFileServer();

// Set prefix to /api for all routes
app.UseFastEndpoints(c => c.Endpoints.RoutePrefix = "api");

// Swagger
app.UseSwaggerGen();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<RoomDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await SeedData.InitializeAsync(context, userManager);
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
