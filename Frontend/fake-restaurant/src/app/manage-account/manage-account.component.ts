import { Component, inject } from '@angular/core';
import { Navigation, Router, RouterLink, RouterModule } from '@angular/router';
import { UserItem } from '../_models/user-item.type';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

@Component({
  selector: 'app-manage-account',
  imports: [RouterLink, RouterModule],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent {


  	user: UserItem;
	authService = inject(AuthService);
	restService = inject(RestBackendService);
	toastr = inject(ToastrService);
	router = inject(Router);
  
  	constructor() {
    	this.user = { email : this.authService.getUser() ?? "",};

  	}

	logout() {
		if(confirm('Are you sure you want to log out?')) {
			this.authService.logout();
			this.router.navigate(['/home']);
			this.toastr.success('You have been logged out successfully.', 'Logout');
			
		}
		
	}

	deleteAccount() {
		if(confirm('Are you sure you want to delete account?')) {
			this.restService.deleteAccount(this.authService.getUser()??"").subscribe({
			  next: (data) => {
			
				this.authService.logout();
				this.router.navigate(['/home']);
				this.toastr.success('You have been delete account successfully.', 'Logout');
				
			  },
			  error: (err) => {
			
			    this.toastr.error("Sorry try later", "Error")			
			  }
			});
			
		}
	}

}
