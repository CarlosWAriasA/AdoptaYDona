using System.ComponentModel.DataAnnotations;

namespace IdentityLayer.Core.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Usuario es requerido")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Contraseña es requerida")]
        public string Password { get; set; }
    }
}
