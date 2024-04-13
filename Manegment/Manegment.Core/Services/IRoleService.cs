using Manegment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Services
{
    public interface IRoleService
    {
         Task<IEnumerable<Role>> Get();
         Task<Role> Add(Role role);

    }
}
