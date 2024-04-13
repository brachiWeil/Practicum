using AutoMapper;
using Manegment.Core.DTO;
using Manegment.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Core.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            //ForMember(x=>x.RoleName, d => d.MapFrom(x => x.Roles[0].Role.Name)).
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<EmployeeRole,RoleEmployeeDto>().ReverseMap();

        }
    }
}
