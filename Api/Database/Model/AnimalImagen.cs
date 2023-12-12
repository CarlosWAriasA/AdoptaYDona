using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class AnimalImagen
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int AnimalId { get; set; }
        public string RutaImagen { get; set; }

        [ForeignKey("AnimalId")]
        public virtual Animal Animal { get; set; }
    }
}
