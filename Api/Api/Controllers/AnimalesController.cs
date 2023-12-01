using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Database;
using Database.Model;
using Api.DTOs;
using System.IO;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalesController : ControllerBase
    {
        private readonly AdoptaYDonaContext _context;

        public AnimalesController(AdoptaYDonaContext context)
        {
            _context = context;
        }

        // GET: api/Animales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAnimales()
        {
          if (_context.Animales == null)
          {
              return NotFound();
          }
            return await _context.Animales.ToListAsync();
        }

        // GET: api/Animales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimal(int id)
        {
          if (_context.Animales == null)
          {
              return NotFound();
          }
            var animal = await _context.Animales.FindAsync(id);

            if (animal == null)
            {
                return NotFound();
            }

            return animal;
        }

        // PUT: api/Animales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal(int id, Animal animal)
        {
            if (id != animal.Id)
            {
                return BadRequest();
            }

            _context.Entry(animal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
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

        // POST: api/Animales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<AnimalDTO> PostAnimal([FromBody] AnimalDTO animal)
        {
            try
            {
                Animal animalData = new Animal
                {
                    Nombre = animal.Nombre,
                    Genero = animal.Genero,
                    Edad = animal.Edad,
                    Tipo = animal.Tipo,
                    Estatus = AnimalDTO.ESTATUS_ACTIVO,
                    FechaCreacion = DateTime.Now,
                    UsuarioId = 1,
                };
                _context.Animales.Add(animalData);
                await _context.SaveChangesAsync();
                animal?.Imagenes?.ForEach(i =>
                {
                    i.ContentByte = Convert.FromBase64String(i.Content);
                    string imagePath = Path.Combine("Images", $"{Guid.NewGuid().ToString("N")}-{i.Name}");
                    System.IO.File.WriteAllBytes(imagePath, i.ContentByte);
                    AnimalImagen animalImagen = new AnimalImagen
                    {
                        AnimalId = animalData.Id,
                        RutaImagen = imagePath
                    };
                    _context.AnimalesImagenes.Add(animalImagen);
                });
                await _context.SaveChangesAsync();
                
                return animal;
            }
            catch (Exception e)
            {
                throw e;
            }
          
        }

        // DELETE: api/Animales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            if (_context.Animales == null)
            {
                return NotFound();
            }
            var animal = await _context.Animales.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animales.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnimalExists(int id)
        {
            return (_context.Animales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
