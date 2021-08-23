import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent {

  public employees: Employees[];
  public sex: Sex[] = [{ id: "", value: "" }, { id: "F", value: "kobieta" }, { id: "M", value: "mężczyzna" }];
  private employeesSaved: Employees[];
  private newAttribute: any = [];
  isEditing: boolean = false;
  isAdding: boolean = false;
  newRow: boolean = false;
  enableEditIndex = null;
  clonedEmployees: { [s: string]: Employees; } = {};
  newEmployeeId: number;
  searchVal: string = '';
  searchNameVal: string = '';
  searchSurnameVal: string = '';
  searchBirthDateVal: string = null;
  searchSexVal: string = '';
  searchCityVal: string = '';
  searchSexId: string = '';

  serializedDate = new FormControl((new Date()).toISOString());

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Employees[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.employees = result;
      this.employeesSaved = result;
      this.newEmployeeId = this.employees.length + 1;
    }, error => console.error(error));
  }


  deleteRow(id) {
    for (let i = 0; i < this.employees.length; ++i) {
      if (this.employees[i].idEmployee === id) {
        this.employees.splice(i, 1);
      }
    }
    this.employeesSaved = this.employees;
  }
  switchEditMode(employee: Employees) {
    if (!this.newRow) {
      this.isEditing = true;
      this.enableEditIndex = employee.idEmployee;
      employee.birthDate = employee.birthDate.substring(0, 10);
      this.clonedEmployees[employee.idEmployee] = { ...employee };
    }
  }
  save(employee: Employees) {
    this.isEditing = false;
    this.enableEditIndex = null;
    delete this.clonedEmployees[employee.idEmployee];
    this.employeesSaved = this.employees;
  }
  cancelEdit(e, idEmployee) {
    e.employees[idEmployee - 1] = this.clonedEmployees[idEmployee];
    delete this.clonedEmployees[idEmployee];
    this.isEditing = false;
    this.enableEditIndex = null;
  }
  addFieldValue() {
    if (!this.newRow && !this.isEditing) {
      this.employees.push(this.newAttribute)
      this.newAttribute = {};
      this.newRow = true;
      this.isEditing = true;
    }
  }
  add(employee: Employees) {
    employee.idEmployee = this.newEmployeeId;
    this.employeesSaved = this.employees;
    this.newEmployeeId++;
    this.newRow = false;
    this.isEditing = false;
  }
  cancelAdd() {
    this.employees.splice(this.employees.length - 1, 1);
    this.newRow = false;
    this.isEditing = false;
  }
  checkSearchVal() {
    this.employees = this.employeesSaved;
    let filteredEmployees: Employees[] = [];
    if (this.searchVal && this.searchVal != '') {
      if (this.sex.find(f => f.value.substring(0, this.searchVal.length) === this.searchVal.toLowerCase()) != undefined) {
        for (let selectedEmployee of this.employees) {
          if (selectedEmployee.name.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.surname.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.birthDate.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.sex.toLowerCase().search(this.sex.find(f => f.value.substring(0, this.searchVal.length) === this.searchVal.toLowerCase()).id.toLowerCase()) != -1 ||
            selectedEmployee.city.toLowerCase().search(this.searchVal.toLowerCase()) != -1) {
            filteredEmployees.push(selectedEmployee);
          }
        }
        this.employees = filteredEmployees.slice();
      }
      else {
        for (let selectedEmployee of this.employees) {
          if (selectedEmployee.name.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.surname.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.birthDate.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
            selectedEmployee.city.toLowerCase().search(this.searchVal.toLowerCase()) != -1) {
            filteredEmployees.push(selectedEmployee);
          }
        }
        this.employees = filteredEmployees.slice();
      }
    }
  }
  checkFilterVal() {
    debugger;
    this.employees = this.employeesSaved;
    let filteredEmployees: Employees[] = [];
    if (this.searchNameVal && this.searchNameVal != '') {
      for (let selectedEmployee of this.employees) {
        if (selectedEmployee.name.toLowerCase().search(this.searchNameVal.toLowerCase()) != -1) {
          filteredEmployees.push(selectedEmployee);
        }
      }
      this.employees = filteredEmployees.slice();
      filteredEmployees = [];
    }
    if (this.searchSurnameVal && this.searchSurnameVal != '') {
      for (let selectedEmployee of this.employees) {
        if (selectedEmployee.surname.toLowerCase().search(this.searchSurnameVal.toLowerCase()) != -1) {
          filteredEmployees.push(selectedEmployee);
        }
      }
      this.employees = filteredEmployees.slice();
      filteredEmployees = [];
    }
    if (this.searchBirthDateVal && this.searchBirthDateVal != '') {
      for (let selectedEmployee of this.employees) {
        if (selectedEmployee.birthDate.toLowerCase().search(this.searchBirthDateVal.toLowerCase()) != -1) {
          filteredEmployees.push(selectedEmployee);
        }
      }
      this.employees = filteredEmployees.slice();
      filteredEmployees = [];
    }
    if (this.searchSexVal && this.searchSexVal != '') {
      for (let selectedEmployee of this.employees) {
        if (selectedEmployee.sex.toLowerCase().search(this.searchSexVal.toLowerCase()) != -1) {
          filteredEmployees.push(selectedEmployee);
        }
      }
      this.employees = filteredEmployees.slice();
      filteredEmployees = [];
    }
    if (this.searchCityVal && this.searchCityVal != '') {
      for (let selectedEmployee of this.employees) {
        if (selectedEmployee.city.toLowerCase().search(this.searchCityVal.toLowerCase()) != -1) {
          filteredEmployees.push(selectedEmployee);
        }
      }
      this.employees = filteredEmployees.slice();
      filteredEmployees = [];
    }
  }
  sort(colName) {
    this.employees.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
  }
}

interface Employees {
  idEmployee: number;
  name: string;
  surname: string;
  birthDate: string;
  sex: string;
  city: string;
}
interface Sex {
  id: string;
  value: string;
}
