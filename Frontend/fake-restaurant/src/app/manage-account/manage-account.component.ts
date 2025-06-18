import { Component, inject } from '@angular/core';
import { Navigation, Router, RouterLink, RouterModule } from '@angular/router';
import { UserItem } from '../_models/user-item.type';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-account',
  imports: [RouterLink, RouterModule],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent {

  	user: UserItem;
	authService = inject(AuthService);
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

}
