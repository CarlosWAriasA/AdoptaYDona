using Database;
using Database.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudDonacionController : Controller
    {

        private readonly AdoptaYDonaContext _context;


        public SolicitudDonacionController(AdoptaYDonaContext context)
        {
            _context = context;
        }


        [HttpPost("SolicitarAnimal/{animalId}")]
        public async Task<IActionResult> SolicitarAnimal(int animalId)
        {
            try
            {
                // Verifica si el animal existe
                //Esta condicion es solo  para probar algo, en caso de que se me olvide borrarla a la hora de hacer el push
                var animal = await _context.Animales.FindAsync(animalId);
                if (animal == null)
                {
                    return NotFound("Animal no encontrado");
                }

                // Crea una nueva solicitud
                var solicitud = new SolicitudDonacion
                {
                    AnimalSolicitud = animalId
                };


                _context.SolicitudDonaciones.Add(solicitud);
                await _context.SaveChangesAsync();

                return Ok("Solicitud realizada con éxito");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }


    }
}
