using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChasRooms.Server.Migrations
{
    /// <inheritdoc />
    public partial class yea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "features",
                table: "Rooms",
                newName: "Features");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "UserBooking",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserBooking_UserId1",
                table: "UserBooking",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBooking_AspNetUsers_UserId1",
                table: "UserBooking",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBooking_AspNetUsers_UserId1",
                table: "UserBooking");

            migrationBuilder.DropIndex(
                name: "IX_UserBooking_UserId1",
                table: "UserBooking");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserBooking");

            migrationBuilder.RenameColumn(
                name: "Features",
                table: "Rooms",
                newName: "features");
        }
    }
}
