using AutoMapper;
using Manegment.API.Models;
using Manegment.Core.DTO;
using Manegment.Core.Entities;
using Manegment.Core.Services;
using Manegment.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manegment.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = await _roleService.Get();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }
        
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Post([FromBody] RolePostModel model)
        {
            var roleName = await _roleService.Add(_mapper.Map<Role>(model));
            return Ok(_mapper.Map<RoleDto>(roleName));
        }




    }
}
