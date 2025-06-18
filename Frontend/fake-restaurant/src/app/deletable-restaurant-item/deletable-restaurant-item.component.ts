import { Component, inject, Input } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { ImageItem } from '../_models/image-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletable-restaurant-item',
  imports: [],
  templateUrl: './deletable-restaurant-item.component.html',
  styleUrl: './deletable-restaurant-item.component.scss'
})
export class DeletableRestaurantItemComponent {

 	@Input({ required: true }) restaurantItem: RestaurantItem;
  	images: ImageItem[];
  	imageNumber: number = 0;
  	restService = inject(RestBackendService);
  	private toastr = inject(ToastrService);
  	router = inject(Router);
	
  	ngOnInit() {
  	  this.restService.getImagesOfResturant(this.restaurantItem.id).subscribe({
  	    next: (data) => {
  	      //console.log(data);
  	      this.images = data;
	
  	    },
  	    error: (err) => {
  	      this.toastr.error("Sorry, try later", "Error");       
  	    }
  	  });

	  if(localStorage.getItem('RestaurantDeleted') === "true") {
		localStorage.removeItem('RestaurantDeleted');
		this.toastr.success("Restaurant deleted successfully", "Success");
	  }
	
  	}

  	prevImage() {
  	  if (this.imageNumber > 0) {
  	    this.imageNumber--;
  	  }
  	}

  	nextImage() {
  	  if (this.imageNumber < this.images.length - 1) {
  	    this.imageNumber++;
  	  }
  	}

  	viewDetail() {
  	  this.router.navigate([`/restaurants/${this.restaurantItem.name}`], {
  	    state: {
  	      restaurantItem: this.restaurantItem,
  	      images: this.images
  	    }
  	  });
  	}

	deleteRestaurant() {
		this.restService.getRemoveResturant(this.restaurantItem.id).subscribe({
  	    next: (data) => {
			localStorage.setItem('RestaurantDeleted', "true");		
  	      
	
  	    },
  	    error: (err) => {
  	      this.toastr.error("Sorry, try later", "Error");       
  	    }
  	  });
	}
}
