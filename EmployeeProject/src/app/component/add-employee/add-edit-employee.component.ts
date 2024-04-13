import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../class/Employee';
import { EmployeeService } from '../../employee-service.service';
import Swal from 'sweetalert2';
import { RoleService } from '../../role-service.service';
import { Role } from '../../class/Role';
import { AddRole } from '../../class/AddRole';
import { RoleComponent } from '../role/role.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RoleComponent, MatIcon, MatInputModule, MatFormFieldModule, MatTooltip],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})

export class AddEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  public employeeForm!: FormGroup;
  public roles: Role[] = [];
  public duplicateRole: boolean = false;
  public dateRoleNoValid: boolean = false;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private router: Router,
    private readonly dialogRef: MatDialogRef<AddEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, employee?: Employee }
  ) {
    if (data.isEdit) {
      this.employee = data.employee
    }
  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      idEmployee: [this.employee ? this.employee!.idEmployee : '', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      firstName: [this.employee ? this.employee!.firstName : '', [Validators.required, Validators.pattern("^[a-zA-Z\u0590-\u05FF ']{2,20}$")]],
      lastName: [this.employee ? this.employee!.lastName : '', [Validators.required, Validators.pattern("^[a-zA-Z\u0590-\u05FF ']{2,20}$")]],
      startDate: [this.employee ? this.employee!.startDate : new Date(), [Validators.required]],
      bornDate: new FormControl<Date>(this.employee ? this.employee!.bornDate : new Date(), [Validators.required]),
      gender: new FormControl<Boolean>(this.employee ? this.employee!.gender : true, [Validators.required]),
      roles: new FormControl<AddRole[]>(this.employee ? this.employee!.roles : [{}], [Validators.required]),
    });
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  save() {
    const employee: Employee = this.employeeForm.value;
    console.log("employee", employee);
    if (this.data.isEdit) {
      this.employeeService.updateEmployee(employee.idEmployee, employee).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Thank you!",
            text: "The employee was successfully updated!",
            icon: "success",
            color: "#558582",
            confirmButtonColor: '#558582',
            iconColor: "#558582"

          });
          this.dialogRef.close();

        },
        error: (error) => {
          console.error("Error updating user:", error);
          console.log("update");
        }
      });
    }
    else {
      this.employeeService.addEmployee(employee).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Thank you!",
            text: "The employee was successfully added!",
            icon: "success",
            color: "#558582",
            confirmButtonColor: '#558582',
            iconColor: "#558582"
          });
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Error adding user:", error);
          console.log("add");

        }
      });
    }

  }
  isRoleValid() {
    var isValid = true;
    this.duplicateRole = false;
    this.dateRoleNoValid = false;
    var roles = [...this.employeeForm.controls['roles'].value as AddRole[]];
    roles.forEach((role, index) => {
      const duplicateIndex = roles.findIndex((r, i) => r.roleId?.toString() === role.roleId?.toString() && i !== index);
      if (duplicateIndex !== -1) {
        this.duplicateRole = true;
        isValid = false;
        return;
      }
    });
    roles.forEach(f => {
      if (f.roleId == null || f.roleId == 0 || f.isManagerial == null || f.startDate == null) {
        isValid = false;
      }
      else if (f.startDate < this.employeeForm.controls['startDate'].value) {
        this.dateRoleNoValid = true;
        isValid = false;
      }

    })
    return isValid;
  }
  addRole() {
    this.employeeForm.controls['roles']?.setValue([...this.employeeForm.controls['roles']?.value, {}]);
  }
  deleteRole(index: number) {
    if (this.employeeForm.controls['roles']) {
      var roles = [...this.employeeForm.controls['roles'].value as Role[]];
      this.employeeForm.controls['roles']?.setValue([...roles.filter((r, i) => i != index)]);
    }
  }
  updateRole(ev: AddRole, index: number) {
    if (this.employeeForm.controls['roles']) {
      var roles = [...this.employeeForm.controls['roles'].value as AddRole[]];
      this.employeeForm.controls['roles']?.setValue([...roles.map((r, i) => {
        if (i == index)
          return ev;
        else
          return r;
      })], { emitEvent: false });
    }
  }
  cencel() {
    this.dialogRef.close();
  }
}

