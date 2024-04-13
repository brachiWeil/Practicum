using AutoMapper;
using Manegment.API.Models;
using Manegment.Core.Entities;

namespace Manegment.API.Mapping
{
    public class PostModelsMapping:Profile
    {
        public PostModelsMapping()
        {
            CreateMap<EmployeePostModel,Employee>();
            CreateMap<Employee,EmployeePostModel >();
            CreateMap<RolePostModel,Role>();
            CreateMap<EmployeeRolePostModel,EmployeeRole>().ReverseMap();
        }
    }
}
