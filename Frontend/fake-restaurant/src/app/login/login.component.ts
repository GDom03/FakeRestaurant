import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submitted = false;
  toastr = inject(ToastrService);
  restService = inject(RestBackendService);
  router = inject(Router);
  authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email,
    ]),
    pass: new FormControl('', [
      Validators.required, 
      Validators.minLength(6)])
  });

  showPassword = false;


  handleLogin() {
    this.submitted = true;
    if(this.loginForm.invalid){
      this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
    } else {
      this.restService.login({
        UserEmail: this.loginForm.value.email as string,
        password: this.loginForm.value.pass as string,
      }).subscribe({
        next: (msg) => {
          this.authService.updateToken(msg.token).then(() => {
            this.toastr.success(`You can now manage your account`,`Welcome ${this.loginForm.value.email}!`);
            setTimeout(() => {this.router.navigate(['/manage-account'], {
                state: {
                  user: {email : this.loginForm.value.email,},
              
                }
              }
            )}, 10);
            
            
            
          });
        },
        error: (err) => {
          this.toastr.error("Please, insert a valid email and password", "Oops! Invalid credentials");
        },
        complete: () => {
          
        }
      })
    }
  }

}
