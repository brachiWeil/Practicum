using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.DTO
{
    public class RoleEmployeeDto
    {
        public bool IsManagement { get; set; }
        public DateTime StartDate { get; set; }
        public RoleDto Role { get; set; }
    }
}
