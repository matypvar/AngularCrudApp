using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularCrudApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularCrudApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet]
        public List<EmployeesModel> Get()
        {
            EmployeesViewModel employeesViewModel = new EmployeesViewModel();
            return employeesViewModel.GetEmployees();
        }
    }
}