
using Manegment.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Manegment.Data
{
    public class DataContext : DbContext
    {
      
        
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=EmployeeDB_Brachi");
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
       
    }
}
