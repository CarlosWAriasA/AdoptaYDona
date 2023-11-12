using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class Mensaje
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Entidad { get; set; }
        public int? UsuarioEmisorId { get; set; }
        public int? UsuarioReceptorId { get; set; }
        public DateTime FechaCreacion { get; set; }

        [ForeignKey("UsuarioEmisorId")]
        public virtual Usuario UsuarioEmisor { get; set; }

        [ForeignKey("UsuarioReceptorId")]
        public virtual Usuario UsuarioReceptor { get; set; }
    }
}
