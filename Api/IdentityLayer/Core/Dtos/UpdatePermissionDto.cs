using System.ComponentModel.DataAnnotations;

namespace IdentityLayer.Core.Dtos
{
    public class UpdatePermissionDto
    {
        [Required(ErrorMessage = "Usuario es requerido")]
        public string UserName { get; set; }

    }
}
