using Manegment.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Manegment.API.Models
{
    public class EmployeePostModel
    {
        [Required(ErrorMessage = "ID is required")]
        [RegularExpression("^[0-9]{9}$", ErrorMessage = "ID must contain exactly 9 digits")]
        public string IdEmployee { get; set; }

        [Required(ErrorMessage = "FirstName is required")]
        [RegularExpression("^[a-zA-Z\u0590-\u05FF ']{2,20}$", ErrorMessage = "First Name must contain between 2 to 20 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        [RegularExpression("^[a-zA-Z\u0590-\u05FF ']{2,20}$", ErrorMessage = "LastName must contain  between 2 to 20 characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "StartDate is required")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "BornDate is required")]
        public DateTime BornDate { get; set; }
        [Required(ErrorMessage = "Gender is required")]


        public bool Gender { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }
    }
}
