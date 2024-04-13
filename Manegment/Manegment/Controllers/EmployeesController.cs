using AutoMapper;
using Manegment.API.Models;
using Manegment.Core.DTO;
using Manegment.Core.Entities;
using Manegment.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manegment.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {

            var employees = await _employeeService.Get();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var employee = await _employeeService.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeePostModel>(employee));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel model)
        {
            var employee = await _employeeService.Add(_mapper.Map<Employee>(model));
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(string id, [FromBody] EmployeePostModel model)
        {
            var employee = await _employeeService.GetById(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(model, employee);
            await _employeeService.Update(employee);
            return Ok(_mapper.Map<Employee>(employee));

        }
        [HttpDelete("{id}")]
        [Authorize]

        public async Task<ActionResult> Delete(string id)
        {
            var employee = await _employeeService.GetById(id);
            if (employee is null)
            {
                return NotFound();
            }

            var deletedEmployee = await _employeeService.Delete(id);
            if (deletedEmployee is null)
            {
                return StatusCode(500);

            }
            return Ok(deletedEmployee);

        }

    }
}


