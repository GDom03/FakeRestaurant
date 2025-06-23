import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  	toastr = inject(ToastrService);
  	router = inject(Router);
  	restService = inject(RestBackendService);
  	submitted: boolean = false;
  	signupForm = new FormGroup({
  		email: new FormControl('', [
  	   	 	Validators.required,
  	    	Validators.email,]),
  	  	name: new FormControl('', [Validators.required]),
  	  	surname: new FormControl('', [Validators.required]),
    	pass: new FormControl('', [
      		Validators.required, 
      		Validators.minLength(6), 
      	])
  	});

  	showPassword = false;

  	handleSignup() {
  	  	console.log("Signup");
  	  	this.submitted = true;
  	  	if(this.signupForm.invalid){
  	    	this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
  	  	} else {
  	    	this.restService.signup({
  	      		UserEmail: this.signupForm.value.email as string,
  	      		password: this.signupForm.value.pass as string,
  	      		name: this.signupForm.value.name as string,
  	      		surname: this.signupForm.value.surname as string,
  	    	}).subscribe({
  	      		error: (err) => {
  	        		this.toastr.error("The username you selected was already taken", "Oops! Could not create a new user");
  	     	 	},
  	      		complete: () => {
  	        		this.toastr.success(`You can now login with your new account`,`Congrats ${this.signupForm.value.email}!`);
  	        		this.router.navigateByUrl("/login");
  	      		}
  	    	}
			);
  	  	}
  	}

}	
