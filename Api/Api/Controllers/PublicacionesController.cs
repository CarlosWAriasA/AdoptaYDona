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

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionesController : ControllerBase
    {
        private readonly AdoptaYDonaContext _context;

        public PublicacionesController(AdoptaYDonaContext context)
        {
            _context = context;
        }

        // GET: api/Publicaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PublicacionDTO>>> GetPublicaciones()
        {
            try
            {
                if (_context.Animales == null)
                {
                    return NotFound();
                }
                var publicaciones = await _context.Publicaciones.ToListAsync();
                List<PublicacionDTO> publicacionDTOs = new List<PublicacionDTO>();
                foreach (var publicacion in publicaciones)
                {
                    PublicacionDTO publicacionDTO = new PublicacionDTO()
                    {
                        Id = publicacion.Id,
                        UsuarioId = publicacion.UsuarioEmisorId,
                        Comentario = publicacion.Comentario
                    };

                    try
                    {

                        byte[] bytesImagen = System.IO.File.ReadAllBytes(publicacion.RutaImagen);
                        if (bytesImagen.Length > 0)
                        {
                            string base64String = Convert.ToBase64String(bytesImagen);
                            publicacionDTO.ImagenBase64 = base64String;
                        }
                    }
                    catch (Exception)
                    {
                    }

                    publicacionDTOs.Add(publicacionDTO);
                }
                return publicacionDTOs;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        // GET: api/Publicaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Publicacion>> GetPublicacion(int id)
        {
          if (_context.Publicaciones == null)
          {
              return NotFound();
          }
            var publicacion = await _context.Publicaciones.FindAsync(id);

            if (publicacion == null)
            {
                return NotFound();
            }

            return publicacion;
        }

        // PUT: api/Publicaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublicacion(int id, Publicacion publicacion)
        {
            if (id != publicacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(publicacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicacionExists(id))
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

        // POST: api/Publicaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PublicacionDTO>> PostPublicacion([FromBody] PublicacionDTO publicacionDto)
        {

            try
            {
                if (_context.Publicaciones == null)
                {
                    return Problem("Entity set 'AdoptaYDonaContext.Publicaciones'  is null.");
                }

                Publicacion publicacion = new Publicacion()
                {
                    Comentario = publicacionDto.Comentario ?? "",
                    UsuarioEmisorId = publicacionDto.UsuarioId,
                    FechaCreacion = DateTime.Now,
                };
                var imageByte = Convert.FromBase64String(publicacionDto.ImagenBase64 ?? "");
                string imagePath = Path.Combine("Images", $"{Guid.NewGuid().ToString("N")}-{publicacion.UsuarioEmisorId}");
                System.IO.File.WriteAllBytes(imagePath, imageByte);
                publicacion.RutaImagen = imagePath;

                _context.Publicaciones.Add(publicacion);
                await _context.SaveChangesAsync();

                return publicacionDto;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        // DELETE: api/Publicaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicacion(int id)
        {
            if (_context.Publicaciones == null)
            {
                return NotFound();
            }
            var publicacion = await _context.Publicaciones.FindAsync(id);
            if (publicacion == null)
            {
                return NotFound();
            }

            _context.Publicaciones.Remove(publicacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublicacionExists(int id)
        {
            return (_context.Publicaciones?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
