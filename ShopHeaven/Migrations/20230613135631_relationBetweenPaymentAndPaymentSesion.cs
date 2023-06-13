using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class relationBetweenPaymentAndPaymentSesion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentId",
                table: "PaymentSessions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions",
                column: "PaymentId",
                unique: true,
                filter: "[PaymentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentSessions_Payments_PaymentId",
                table: "PaymentSessions",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentSessions_Payments_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "PaymentSessions");

            migrationBuilder.DropColumn(
                name: "PaymentSessionId",
                table: "Payments");
        }
    }
}
