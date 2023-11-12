using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Animal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Genero { get; set; }
        public string Estatus { get; set; }
        public string Tipo { get; set; }
        public int? Edad { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual ICollection<AnimalImagen> Imagenes { get; set; }

        [ForeignKey("UsuarioId")]
        public virtual Usuario Usuario { get; set; }
    }
}
