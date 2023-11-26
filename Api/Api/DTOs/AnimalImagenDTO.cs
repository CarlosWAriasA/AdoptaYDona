namespace Api.DTOs
{
    public class AnimalImagenDTO
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public long Size { get; set; }
        public string Content { get; set; }
        public byte[]? ContentByte { get; set; }
    }
}
