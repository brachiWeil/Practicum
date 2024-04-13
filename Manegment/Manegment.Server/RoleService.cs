using Manegment.Core.Entities;
using Manegment.Core.Repositories;
using Manegment.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Services
{
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _RoleRepository;
        public RoleService(IRoleRepository RoleRepository)
        {
            _RoleRepository = RoleRepository;
        }
        public async Task<Role> Add(Role Role)
        {
            return await _RoleRepository.Add(Role);
        }
      

        public async Task<IEnumerable<Role>> Get()
        {
            return await _RoleRepository.Get();
        }
    }
}
