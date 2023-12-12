using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AnimalController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
