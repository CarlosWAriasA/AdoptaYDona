using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Contrasena { get; set; }
        public string Correo { get; set; }
        public string? Genero { get; set; }
        public string Ubicacion { get; set; }
        public string? RutaImagen { get; set; }
        public DateTime FechaCreacion { get; set; }
        public virtual ICollection<Animal> Animales { get; set; }
    }
}
