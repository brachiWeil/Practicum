using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Entities
{
    public class Employee
    {
        public int Id { get; set; }

        public string IdEmployee { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BornDate { get; set; }
        public bool Gender { get; set; }
        public List<EmployeeRole> Roles { get; set; } 
        public bool IsActive { get; set; }

    }
}
