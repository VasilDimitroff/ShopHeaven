using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class foreignKeyInPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.DropIndex(
                name: "IX_Payments_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions",
                column: "PaymentId",
                unique: true,
                filter: "[PaymentId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
