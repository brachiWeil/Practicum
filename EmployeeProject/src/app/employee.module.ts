import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DisplayEmployeeComponent } from './component/display-employee/display-employee.component';
import { AddEmployeeComponent } from './component/add-employee/add-edit-employee.component';
const routes: Routes = [
  { path: '', redirectTo: 'employee-list', pathMatch: 'full' },
  { path: 'employee-list', component: DisplayEmployeeComponent },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class EmployeeModule { }