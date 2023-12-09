namespace IdentityLayer.Core.Dtos
{
    public class AuthServiceResponseDto
    {
        public bool IsSucceed { get; set; }
        public string Message { get; set; }
        public string userId { get; set; }
        public string FullName { get; set; }
    }
}
