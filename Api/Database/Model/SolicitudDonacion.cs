using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Model
{
    public class SolicitudDonacion
    {

        public int Id { get; set; }

        public int AnimalSolicitud { get; set; }

        [ForeignKey("AnimalSolicitud")]
        public virtual Animal Animal { get; set; }


    }
}
