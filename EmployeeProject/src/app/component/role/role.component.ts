import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';
import { debounce } from 'rxjs/internal/operators/debounce';
import { AddRole } from '../../class/AddRole';
import { Role } from '../../class/Role';
import { RoleService } from '../../role-service.service';
@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatIcon,MatTooltip],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  @Input() role?: AddRole;
  @Output() updateRole = new EventEmitter<AddRole>();
  @Output() deleteRole = new EventEmitter();

  public roleForm!: FormGroup;
  public roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {

    this.roleForm = this.fb.group({
      roleId: new FormControl<number | undefined>(this.role?.roleId, [Validators.required]),
      isManagerial: new FormControl<boolean | undefined>(this.role?.isManagerial, [Validators.required]),
      startDate: new FormControl<Date | undefined>(this.role?.startDate, [Validators.required]),
    });
    this.roleForm.valueChanges.pipe(debounceTime(2000)).subscribe(role => {
      if (!this.roleForm.invalid) {
        this.updateRole.emit(role);
      }
    });
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  delete() {
    this.deleteRole.emit();
  }
}
