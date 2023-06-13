using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedIndexPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Премахване на външния ключ, свързан с колоната "PaymentSessionId" в таблицата "Payments"
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            // Премахване на индекса, свързан с колоната "PaymentSessionId" в таблицата "Payments"
            migrationBuilder.DropIndex(
                name: "IX_Payments_PaymentSessionId",
                table: "Payments");

            // Премахване на колоната "PaymentSessionId" в таблицата "Payments"
            migrationBuilder.DropColumn(
                name: "PaymentSessionId",
                table: "Payments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
