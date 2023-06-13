using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class foreignKeyInPaymentNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentSessions_Payments_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentSessions_PaymentId",
                table: "PaymentSessions");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentId",
                table: "PaymentSessions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentId",
                table: "PaymentSessions",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentSessions_Payments_PaymentId",
                table: "PaymentSessions",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id");
        }
    }
}
