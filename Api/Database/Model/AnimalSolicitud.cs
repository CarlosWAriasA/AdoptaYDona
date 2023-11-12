using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class AnimalSolicitud
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int AnimalId { get; set; }
        public int UsuarioEmisorId { get; set; }
        public int UsuarioReceptorId { get; set; }

        [ForeignKey("AnimalId")]
        public virtual Animal Animal { get; set; }

        [ForeignKey("UsuarioEmisorId")]
        public virtual Usuario UsuarioEmisor { get; set; }

        [ForeignKey("UsuarioReceptorId")]
        public virtual Usuario UsuarioReceptor { get; set; }
    }
}
