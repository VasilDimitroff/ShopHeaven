using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class paymentSessionRequiredForPaymentCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentSessionId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PaymentSessions_PaymentSessionId",
                table: "Payments",
                column: "PaymentSessionId",
                principalTable: "PaymentSessions",
                principalColumn: "Id");
        }
    }
}
