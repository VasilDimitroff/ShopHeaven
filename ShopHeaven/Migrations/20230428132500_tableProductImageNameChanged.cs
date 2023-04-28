using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class tableProductImageNameChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsLabels_Labels_LabelId",
                table: "ProductsLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductsLabels_Products_ProductId",
                table: "ProductsLabels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductsLabels",
                table: "ProductsLabels");

            migrationBuilder.RenameTable(
                name: "ProductsLabels",
                newName: "ProductLabel");

            migrationBuilder.RenameIndex(
                name: "IX_ProductsLabels_ProductId",
                table: "ProductLabel",
                newName: "IX_ProductLabel_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel",
                columns: new[] { "LabelId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabel_Labels_LabelId",
                table: "ProductLabel",
                column: "LabelId",
                principalTable: "Labels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabel_Products_ProductId",
                table: "ProductLabel",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Labels_LabelId",
                table: "ProductLabel");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Products_ProductId",
                table: "ProductLabel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel");

            migrationBuilder.RenameTable(
                name: "ProductLabel",
                newName: "ProductsLabels");

            migrationBuilder.RenameIndex(
                name: "IX_ProductLabel_ProductId",
                table: "ProductsLabels",
                newName: "IX_ProductsLabels_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductsLabels",
                table: "ProductsLabels",
                columns: new[] { "LabelId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsLabels_Labels_LabelId",
                table: "ProductsLabels",
                column: "LabelId",
                principalTable: "Labels",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsLabels_Products_ProductId",
                table: "ProductsLabels",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
