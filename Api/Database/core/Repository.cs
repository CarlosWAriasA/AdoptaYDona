using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Database.core
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly AdoptaYDonaContext _context;
        private DbSet<TEntity> _dbSet;

        public Repository(AdoptaYDonaContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public virtual async Task<List<TEntity>> GetEntitiesAsync(Expression<Func<TEntity, bool>>? filter = null)
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null) query = query.Where(filter);

            return await query.ToListAsync();
        }
        public virtual async Task<TEntity?> GetEntityAsync(Expression<Func<TEntity, bool>>? filter = null, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked) query = query.AsNoTracking();

            if (filter != null) query = query.Where(filter);

            return await query.FirstOrDefaultAsync();
        }
        public virtual async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await _dbSet.AnyAsync();
        }
        public virtual async Task SaveAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            await SaveChangesAsync();

        }
        public virtual async Task SaveAsync(TEntity[] entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await SaveChangesAsync();
        }
        public virtual async Task UpdateAsync(TEntity entity)
        {
            _dbSet.Update(entity);
            await SaveChangesAsync();
        }
        public virtual async Task UpdateAsync(TEntity[] entities)
        {
            _dbSet.UpdateRange(entities);
            await SaveChangesAsync();
        }
        public virtual async Task RemoveAsync(TEntity entity)
        {
            _dbSet.Remove(entity);
            await SaveChangesAsync();
        }
        public virtual async Task RemoveAsync(TEntity[] entities)
        {
            _dbSet.RemoveRange(entities);
            await SaveChangesAsync();
        }
        public virtual async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
