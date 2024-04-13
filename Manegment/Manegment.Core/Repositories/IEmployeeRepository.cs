using Manegment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Repositories
{
    public interface IEmployeeRepository
    {
     
        Task<IEnumerable<Employee>> Get();

        Task<Employee> GetById(string id);

        Task<Employee> Add(Employee employee);

        Task<Employee> Update(Employee employee);

        Task<Employee> Delete(string id);
    }
}
