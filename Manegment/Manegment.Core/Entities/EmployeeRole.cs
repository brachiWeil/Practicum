using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Entities
{
    public class EmployeeRole
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public bool IsManagerial { get; set; }
        public DateTime StartDate { get; set; }
        public Role Role { get; set; }
    }
}
