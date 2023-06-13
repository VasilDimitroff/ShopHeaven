using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class foreignKeyInPaymentCanBenullNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
