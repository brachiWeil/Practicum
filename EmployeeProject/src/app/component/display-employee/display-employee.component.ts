import { Component, OnInit } from '@angular/core';
import { Employee } from '../../class/Employee';
import { EmployeeService } from '../../employee-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-edit-employee.component';
import { MatTooltip } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatTableModule,MatTooltip],
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = []; // List of employees filtered by search
  searchText: string = ''; //The text to be entered in the search field
  displayedColumns: string[] = ['firstName', 'lastName', 'idEmployee', 'startDate', 'edit-actions', 'delete-actions'];
  dataSource: MatTableDataSource<Employee>;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource<Employee>(this.filteredEmployees);
  }

  ngOnInit(): void {
    this.getEmployee();
  }
getEmployee(){
  this.employeeService.getEmployeeList().subscribe((employees: Employee[]) => {
    this.employees = employees;
    this.filteredEmployees = employees; 
    this.dataSource.data = this.filteredEmployees;

  });
  
}
  openPrintDialog(): void {
    window.print();
  }
  IsAuthorized():boolean
  {
    const token = sessionStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: "Soory!",
        text: "You do not have permission to perform this action!",
        icon: "error",
        color: "#558582",
        confirmButtonColor: '#558582',
        iconColor: "red"

      });
     return false;
    }
    return true;
  }
  exportToExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    // Adding headers to the table
    worksheet.addRow(['ID', 'First Name', 'Last Name', 'Start Date']);

    // Adding the employee data to the sheet
    this.filteredEmployees.forEach(employee => {
      worksheet.addRow([
        employee.idEmployee,
        employee.firstName,
        employee.lastName,
        employee.startDate,
      ]);
    });

    // saving the file
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'employee_list.xlsx');
    });
  }
  handleEdit(id: string): void {
    if(this.IsAuthorized())
    {
    this.employeeService.getEmployeeId(id).subscribe(
      (data: Employee) => {
        this.dialog.open(AddEmployeeComponent, { data: { isEdit: true, employee: data } }).afterClosed(
        ).subscribe(() => {
          this.getEmployee();
        });
      }
    );
  }
}
  handleDelete(id: string): void {
    if(this.IsAuthorized())
    {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployee();
    });
  }
  }
  handleAdd(): void {
    if(this.IsAuthorized())
    {
    this.dialog.open(AddEmployeeComponent, { data: { isEdit: false } }).afterClosed().subscribe(() => {
      this.getEmployee();
    });
  }
  }
  onSearchChange(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      const searchTextLower = this.searchText.toLowerCase();
      return (
        employee.firstName.toLowerCase().includes(searchTextLower) ||
        employee.lastName.toLowerCase().includes(searchTextLower) ||
        employee.idEmployee.toLowerCase().includes(searchTextLower) ||

        (employee.startDate &&
          new Date(employee.startDate).toISOString().toLowerCase().includes(searchTextLower))
      );
    });
    console.log(this.filteredEmployees);
    this.dataSource.data = this.filteredEmployees;
  }
}