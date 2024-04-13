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
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _employeeRepository.Get();
        }

        public async Task<Employee> GetById(string id)
        {
            return await _employeeRepository.GetById(id);
        }
        public async Task<Employee> Add(Employee employee)
        {
            return await _employeeRepository.Add(employee);
        }

        public async Task<Employee> Delete(string id)
        {
          return  await _employeeRepository.Delete(id);
        }

        public async Task<Employee> Update(Employee employee)
        {
            return await _employeeRepository.Update(employee);
        }
    }
}

