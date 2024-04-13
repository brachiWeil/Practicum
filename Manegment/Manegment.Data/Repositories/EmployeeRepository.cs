using Manegment.Core.Entities;
using Manegment.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly DataContext _dataContext;

        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Employee>> Get()
        {
            return await _dataContext.Employees.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task<Employee> GetById(string id)
        {
           
            return await _dataContext.Employees.Include(x => x.Roles).FirstOrDefaultAsync(x => x.IdEmployee == id && x.IsActive);
        }
            public async Task<Employee> Add(Employee employee)
        {
            employee.IsActive= true;
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> Delete(string id)
        {
            var employee = await GetById(id);
            employee.IsActive = false;
            _dataContext.Entry(employee).CurrentValues.SetValues(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> Update(Employee employee)
        {
            //var existEmployee = await GetById(employee.IdEmployee);
            //_dataContext.Entry(existEmployee).CurrentValues.SetValues(existEmployee);
            //await _dataContext.SaveChangesAsync();
            //return existEmployee;
            
            Employee existingEmployee = _dataContext.Employees.FirstOrDefault(w => w.Id == employee.Id);
            if (existingEmployee != null)
            {
               
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.IdEmployee = employee.IdEmployee;
                existingEmployee.StartDate = employee.StartDate;
                existingEmployee.BornDate = employee.BornDate;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.IsActive = employee.IsActive;
                existingEmployee.Roles = employee.Roles;
                await _dataContext.SaveChangesAsync();
            }
            return existingEmployee;
        }
    }
}

