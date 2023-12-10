using Database.Model;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class AdoptaYDonaContext : DbContext
    {
        public AdoptaYDonaContext(DbContextOptions<AdoptaYDonaContext> options) : base(options) 
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Animal> Animales { get; set; }
        public DbSet<AnimalSolicitud> AnimalesSolicitudes { get; set; }
        public DbSet<AnimalImagen> AnimalesImagenes { get; set; }
        public DbSet<Mensaje> Mensajes { get; set; }
        public DbSet<Publicacion> Publicaciones { get; set; }

    }
}