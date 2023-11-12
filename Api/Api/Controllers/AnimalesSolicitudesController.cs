using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database;
using Database.Model;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalesSolicitudesController : ControllerBase
    {
        private readonly AdoptaYDonaContext _context;

        public AnimalesSolicitudesController(AdoptaYDonaContext context)
        {
            _context = context;
        }

        // GET: api/AnimalesSolicitudes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnimalSolicitud>>> GetAnimalesSolicitudes()
        {
          if (_context.AnimalesSolicitudes == null)
          {
              return NotFound();
          }
            return await _context.AnimalesSolicitudes.ToListAsync();
        }

        // GET: api/AnimalesSolicitudes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnimalSolicitud>> GetAnimalSolicitud(int id)
        {
          if (_context.AnimalesSolicitudes == null)
          {
              return NotFound();
          }
            var animalSolicitud = await _context.AnimalesSolicitudes.FindAsync(id);

            if (animalSolicitud == null)
            {
                return NotFound();
            }

            return animalSolicitud;
        }

        // PUT: api/AnimalesSolicitudes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimalSolicitud(int id, AnimalSolicitud animalSolicitud)
        {
            if (id != animalSolicitud.Id)
            {
                return BadRequest();
            }

            _context.Entry(animalSolicitud).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalSolicitudExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AnimalesSolicitudes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AnimalSolicitud>> PostAnimalSolicitud(AnimalSolicitud animalSolicitud)
        {
          if (_context.AnimalesSolicitudes == null)
          {
              return Problem("Entity set 'AdoptaYDonaContext.AnimalesSolicitudes'  is null.");
          }
            _context.AnimalesSolicitudes.Add(animalSolicitud);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnimalSolicitud", new { id = animalSolicitud.Id }, animalSolicitud);
        }

        // DELETE: api/AnimalesSolicitudes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimalSolicitud(int id)
        {
            if (_context.AnimalesSolicitudes == null)
            {
                return NotFound();
            }
            var animalSolicitud = await _context.AnimalesSolicitudes.FindAsync(id);
            if (animalSolicitud == null)
            {
                return NotFound();
            }

            _context.AnimalesSolicitudes.Remove(animalSolicitud);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnimalSolicitudExists(int id)
        {
            return (_context.AnimalesSolicitudes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
