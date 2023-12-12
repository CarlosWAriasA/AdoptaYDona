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
using System.Drawing;
//using IdentityLayer.Migrations;

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
        public async Task<ActionResult<IEnumerable<AnimalDTO>>> GetAnimales([FromQuery] AnimalDTO.Where? where)
        {
            try
            {
                if (_context.Animales == null)
                {
                    return NotFound();
                }
                var animales = await _context.Animales.ToListAsync();
                animales = filterAnimales(animales, where);
                List<AnimalDTO> animalDTOs = new List<AnimalDTO>();
                foreach (var animal in animales)
                {
                    var animalDTO = new AnimalDTO()
                    {
                        Id = animal.Id,
                        Genero = animal.Genero,
                        Edad = animal.Edad,
                        Estatus = animal.Estatus,
                        FechaCreacion = animal.FechaCreacion,
                        Nombre = animal.Nombre,
                        Tipo = animal.Tipo,
                        UsuarioId = animal.UsuarioId
                    };
                    var imagenes = _context.AnimalesImagenes.Where(a => a.AnimalId == animal.Id);
                    if (imagenes.Any())
                    {
                        animalDTO.Imagenes = new List<AnimalImagenDTO>();
                        foreach (var imagen in imagenes)
                        {
                            try
                            {

                                byte[] bytesImagen = System.IO.File.ReadAllBytes(imagen.RutaImagen);
                                if (bytesImagen.Length > 0)
                                {
                                    string base64String = Convert.ToBase64String(bytesImagen);
                                    animalDTO?.Imagenes.Add(new AnimalImagenDTO
                                    {
                                        Content = base64String,

                                    });
                                }
                            }
                            catch (Exception)
                            {
                                // no hacer nada en este caso
                            }
                        }
                    }
                    animalDTOs.Add(animalDTO);
                }
                return animalDTOs;
            }
            catch (Exception e)
            {

                throw e;
            }
      
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
                    UsuarioId = animal.UsuarioId,
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

        private List<Animal> filterAnimales(List<Animal> animales, AnimalDTO.Where where)
        {
            var query = animales.AsQueryable();
            if (where.SoloMis.HasValue && where.SoloMis.Value && !string.IsNullOrWhiteSpace(where.UsuarioId))
            {
                query = query.Where(a => a.UsuarioId == where.UsuarioId);
            }
            if (!string.IsNullOrWhiteSpace(where.Nombre))
            {
                query = query.Where(a => a.Nombre.Contains(where.Nombre));
            }
            if (!string.IsNullOrWhiteSpace(where.Genero))
            {
                query = query.Where(a => a.Genero.Contains(where.Genero));
            }
            if (!string.IsNullOrWhiteSpace(where. Tipo))
            {
                query = query.Where(a => a.Tipo.Contains(where.Tipo));
            }
            if (where.Edad.HasValue && where.Edad != null && where.Edad >= 0)
            {
                query = query.Where(a => a.Edad == where.Edad);
            }
            return query.ToList();
        }

        private bool AnimalExists(int id)
        {
            return (_context.Animales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
