using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ChasRooms.Server.Infrastructure.Persistance
{
    // Used for migrations
    public class DbContextFactory : IDesignTimeDbContextFactory<RoomDbContext>
    {
        public RoomDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.Development.json")
                .Build();

            var connectionString = config.GetConnectionString("DefaultConnection");

            var builder = new DbContextOptionsBuilder<RoomDbContext>();
            builder.UseNpgsql(connectionString);

            return new RoomDbContext(builder.Options);
        }
    }
}
