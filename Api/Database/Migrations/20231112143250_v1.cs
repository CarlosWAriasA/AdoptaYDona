using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Database.Migrations
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contrasena = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genero = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RutaImagen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Animales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genero = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Edad = table.Column<int>(type: "int", nullable: true),
                    UsuarioId = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Animales_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mensajes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Entidad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsuarioEmisorId = table.Column<int>(type: "int", nullable: false),
                    UsuarioReceptorId = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mensajes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mensajes_Usuarios_UsuarioEmisorId",
                        column: x => x.UsuarioEmisorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Mensajes_Usuarios_UsuarioReceptorId",
                        column: x => x.UsuarioReceptorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "AnimalesImagenes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnimalId = table.Column<int>(type: "int", nullable: false),
                    RutaImagen = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalesImagenes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnimalesImagenes_Animales_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnimalesSolicitudes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnimalId = table.Column<int>(type: "int", nullable: false),
                    UsuarioEmisorId = table.Column<int>(type: "int", nullable: false),
                    UsuarioReceptorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalesSolicitudes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnimalesSolicitudes_Animales_AnimalId",
                        column: x => x.AnimalId,
                        principalTable: "Animales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnimalesSolicitudes_Usuarios_UsuarioEmisorId",
                        column: x => x.UsuarioEmisorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_AnimalesSolicitudes_Usuarios_UsuarioReceptorId",
                        column: x => x.UsuarioReceptorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Animales_UsuarioId",
                table: "Animales",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalesImagenes_AnimalId",
                table: "AnimalesImagenes",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalesSolicitudes_AnimalId",
                table: "AnimalesSolicitudes",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalesSolicitudes_UsuarioEmisorId",
                table: "AnimalesSolicitudes",
                column: "UsuarioEmisorId");

            migrationBuilder.CreateIndex(
                name: "IX_AnimalesSolicitudes_UsuarioReceptorId",
                table: "AnimalesSolicitudes",
                column: "UsuarioReceptorId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensajes_UsuarioEmisorId",
                table: "Mensajes",
                column: "UsuarioEmisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensajes_UsuarioReceptorId",
                table: "Mensajes",
                column: "UsuarioReceptorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimalesImagenes");

            migrationBuilder.DropTable(
                name: "AnimalesSolicitudes");

            migrationBuilder.DropTable(
                name: "Mensajes");

            migrationBuilder.DropTable(
                name: "Animales");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
