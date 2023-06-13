using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Премахване на външния ключ, свързан с колоната "PaymentId" в таблицата "PaymentSessions"
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentSessions_Payments_PaymentId",
                table: "PaymentSessions");

            // Премахване на индекса, свързан с колоната "PaymentId" в таблицата "PaymentSessions"
            migrationBuilder.DropIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions");

            // Премахване на колоната "PaymentId" в таблицата "PaymentSessions"
            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "PaymentSessions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
