using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class isSuccessfulFieldOfPaymentSessionRenamed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSuccessfull",
                table: "PaymentSessions",
                newName: "IsSuccessful");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSuccessful",
                table: "PaymentSessions",
                newName: "IsSuccessfull");
        }
    }
}
