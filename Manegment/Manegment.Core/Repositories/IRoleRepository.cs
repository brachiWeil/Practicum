using Manegment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Repositories
{
    public interface IRoleRepository
    {
         Task<IEnumerable<Role>> Get();
         Task<Role> Add(Role role);

    }
}
