using ChasRooms.Server.Domain.Entities;
using ChasRooms.Server.Infrastructure.Persistance;
using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using Wolverine;
using Wolverine.EntityFrameworkCore;
using Wolverine.Postgresql;

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

// Cors fix to allow localhost
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseOutputCache();

app.MapDefaultEndpoints();

app.UseFileServer();

// Set prefix to /api for all routes
app.UseFastEndpoints(c => c.Endpoints.RoutePrefix = "api");

// Swagger
app.UseSwaggerGen();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
