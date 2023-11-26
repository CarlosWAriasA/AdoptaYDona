using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Database.core
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity?> GetEntityAsync(Expression<Func<TEntity, bool>>? filter = null, bool tracked = true);
        Task<List<TEntity>> GetEntitiesAsync(Expression<Func<TEntity, bool>>? filter = null);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filter);
        Task SaveAsync(TEntity entity);
        Task SaveAsync(TEntity[] entities);
        Task UpdateAsync(TEntity entity);
        Task UpdateAsync(TEntity[] entities);
        Task RemoveAsync(TEntity entity);
        Task RemoveAsync(TEntity[] entities);
        Task SaveChangesAsync();

    }
}
