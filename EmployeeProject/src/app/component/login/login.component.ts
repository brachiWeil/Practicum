import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Auth-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  showAdminInputs = false;
  constructor(private authService: AuthService,private router: Router) { }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(d => {
      
        if (typeof (window) !== undefined&&typeof sessionStorage !== 'undefined')
          sessionStorage.setItem("token", "Bearer " + d.token);
        if (d) {
          this.router.navigate(["/employees"]);         
        }
      },
      error => {
        Swal.fire({
          title: "Soory",
          text: "You dont enert good detailes!",
          icon: "error",
          color: "#558582",
          confirmButtonColor: '#558582',
          iconColor: "red"
        });
      }
    )
  }
}