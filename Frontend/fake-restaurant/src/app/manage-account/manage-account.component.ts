import { Component, inject } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { UserItem } from '../_models/user-item.type';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-manage-account',
  imports: [],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent {
  	user: UserItem;
	authService = inject(AuthService);
  
  	constructor(private router: Router) {
    	this.user = { email : this.authService.getUser() ?? "",};

  	}

}
