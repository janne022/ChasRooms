var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var postgresPassword = builder.AddParameter("postgres-password", "postgres");
var postgres = builder.AddPostgres("database", password: postgresPassword, port: 5432)
    .WithContainerName("piglin-db")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithDataVolume()
    .WithPgAdmin(pg =>
    {
        pg.WithLifetime(ContainerLifetime.Persistent);
        pg.WithVolume("pg-admin", "/var/lib/pgadmin");
    })
    .AddDatabase("chasrooms-db");

var server = builder.AddProject<Projects.ChasRooms_Server>("server")
    .WithReference(cache)
    .WithReference(postgres)
    .WaitFor(postgres)
    .WaitFor(cache)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
