import { Component, inject } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { DeletableRestaurantItemComponent } from '../deletable-restaurant-item/deletable-restaurant-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-restaurants',
  imports: [DeletableRestaurantItemComponent],
  templateUrl: './user-restaurants.component.html',
  styleUrl: './user-restaurants.component.scss'
})
export class UserRestaurantsComponent {
	restService = inject(RestBackendService);
  	page: number = 1;
  	restaurants: RestaurantItem[] = [];
  	private toastr = inject(ToastrService);

  	ngOnInit() {
  	  this.fetchUserRestaurants();  
  	}

  	fetchUserRestaurants(page: number = 1, limit: number = 3){
  	  this.restService.getUserResturants(page,limit).subscribe({
  	    next: (data) => {
  	      
  	      this.restaurants = data;
  	    },
  	    error: (err) => {
		
  	      this.toastr.error("Sorry try later", "Error")
	
  	    }
  	  });
	
  	}

  	nextPage(){
  	  if(this.restaurants.length > 0){
  	    this.fetchUserRestaurants(++this.page);
  	  }
	
  	}

  	prevPage(){
  	  if(this.page > 1){
  	    this.fetchUserRestaurants(--this.page);
  	  }
	
  	}
}
