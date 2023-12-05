using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Database.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId1",
                table: "Animales",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Animales_UsuarioId1",
                table: "Animales",
                column: "UsuarioId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Animales_Usuarios_UsuarioId1",
                table: "Animales",
                column: "UsuarioId1",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}
