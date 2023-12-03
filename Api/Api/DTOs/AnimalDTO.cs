using Newtonsoft.Json;

namespace Api.DTOs
{
    public class AnimalDTO
    {
        public static string ESTATUS_ACTIVO = "A";
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Genero { get; set; }
        public string Estatus { get; set; }
        public string Tipo { get; set; }
        public int? Edad { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public List<AnimalImagenDTO>? Imagenes { get; set; }
    }
}
