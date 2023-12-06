using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class AdoptaYDonaContextFactory : IDesignTimeDbContextFactory<AdoptaYDonaContext>
    {

        public AdoptaYDonaContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AdoptaYDonaContext>();

            return new AdoptaYDonaContext(optionsBuilder.Options);
        }
    }
}
