using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopHeaven.Migrations
{
    /// <inheritdoc />
    public partial class BugInTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductImage_Images_ImageId",
                table: "ProductImage");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductImage_Products_ProductId",
                table: "ProductImage");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Labels_LabelId",
                table: "ProductLabel");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Products_ProductId",
                table: "ProductLabel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage");

            migrationBuilder.RenameTable(
                name: "ProductLabel",
                newName: "ProductsLabels");

            migrationBuilder.RenameTable(
                name: "ProductImage",
                newName: "ProductsImages");

            migrationBuilder.RenameIndex(
                name: "IX_ProductLabel_ProductId",
                table: "ProductsLabels",
                newName: "IX_ProductsLabels_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductImage_ImageId",
                table: "ProductsImages",
                newName: "IX_ProductsImages_ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductsLabels",
                table: "ProductsLabels",
                columns: new[] { "LabelId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductsImages",
                table: "ProductsImages",
                columns: new[] { "ProductId", "ImageId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsImages_Images_ImageId",
                table: "ProductsImages",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsImages_Products_ProductId",
                table: "ProductsImages",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsImages_Images_ImageId",
                table: "ProductsImages");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductsImages_Products_ProductId",
                table: "ProductsImages");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductsLabels_Labels_LabelId",
                table: "ProductsLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductsLabels_Products_ProductId",
                table: "ProductsLabels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductsLabels",
                table: "ProductsLabels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductsImages",
                table: "ProductsImages");

            migrationBuilder.RenameTable(
                name: "ProductsLabels",
                newName: "ProductLabel");

            migrationBuilder.RenameTable(
                name: "ProductsImages",
                newName: "ProductImage");

            migrationBuilder.RenameIndex(
                name: "IX_ProductsLabels_ProductId",
                table: "ProductLabel",
                newName: "IX_ProductLabel_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductsImages_ImageId",
                table: "ProductImage",
                newName: "IX_ProductImage_ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel",
                columns: new[] { "LabelId", "ProductId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductImage",
                table: "ProductImage",
                columns: new[] { "ProductId", "ImageId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImage_Images_ImageId",
                table: "ProductImage",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImage_Products_ProductId",
                table: "ProductImage",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

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
    }
}
