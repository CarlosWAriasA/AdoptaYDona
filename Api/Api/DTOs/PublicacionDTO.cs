namespace Api.DTOs
{
    public class PublicacionDTO
    {
        public int? Id { get; set; }
        public string? UsuarioId { get; set; }
        public string? UsuarioNombre { get; set; }
        public string? Comentario { get; set; }
        public string? ImagenBase64 { get; set; }
    }
}
