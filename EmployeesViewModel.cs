using AngularCrudApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularCrudApp
{
    public class EmployeesViewModel
    {
        public List<EmployeesModel> GetEmployees()
        {
            List<EmployeesModel> employees = new List<EmployeesModel>();
            employees.Add(new EmployeesModel { IdEmployee = 1, Name = "Michał", Surname = "Kubiak", BirthDate = Convert.ToDateTime("1988-03-04").Date, Sex = "M", City = "Białystok" });
            employees.Add(new EmployeesModel { IdEmployee = 2, Name = "Bartosz", Surname = "Kurek", BirthDate = Convert.ToDateTime("1990-05-04").Date, Sex = "M", City = "Wrocław" });
            employees.Add(new EmployeesModel { IdEmployee = 3, Name = "Aleksander", Surname = "Śliwka", BirthDate = Convert.ToDateTime("1999-10-22").Date, Sex = "M", City = "Bełchatów" });
            employees.Add(new EmployeesModel { IdEmployee = 4, Name = "Piotr", Surname = "Nowakowski", BirthDate = Convert.ToDateTime("1987-11-04").Date, Sex = "M", City = "Rzeszów" });
            employees.Add(new EmployeesModel { IdEmployee = 5, Name = "Paweł", Surname = "Zatorski", BirthDate = Convert.ToDateTime("1989-03-15").Date, Sex = "M", City = "Warszawa" });
            employees.Add(new EmployeesModel { IdEmployee = 6, Name = "Magdalena", Surname = "Stysiak", BirthDate = Convert.ToDateTime("2000-08-19").Date, Sex = "F", City = "Wrocław" });

            return employees;
        }
    }
}
