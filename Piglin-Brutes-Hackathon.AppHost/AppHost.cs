var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var server = builder.AddProject<Projects.ChasRooms_Server>("server")
    .WithReference(cache)
    .WaitFor(cache)
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();
var postgresPassword = builder.AddParameter("postgres-password", "postgres");
var postgres = builder.AddPostgres("database", password: postgresPassword)
    .WithContainerName("piglin-db")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithHostPort(port: 5432)
    .WithDataVolume()
    .WithPgAdmin(pg =>
    {
        pg.WithLifetime(ContainerLifetime.Persistent);
        pg.WithVolume("pg-admin", "/var/lib/pgadmin");
    });

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WithReference(postgres)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();
