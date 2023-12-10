using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Publicacion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Comentario { get; set; }
        public string RutaImagen { get; set; }
        public string? UsuarioEmisorId { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
