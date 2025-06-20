import { Component, inject } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { ImageItem } from '../_models/image-item.type';
import { Navigation, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReviewItem } from '../_models/review-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewItemComponent } from '../review-item/review-item.component'; 

@Component({
  selector: 'app-restaurant-detail',
  imports: [ReviewItemComponent],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent {


  	restaurantItem: RestaurantItem;
  	images: ImageItem[];
  	imageNumber: number = 0;
  	page: number = 1;
  	reviews: ReviewItem[];
	router = inject(Router);
	location = inject(Location);		
  	restService = inject(RestBackendService);
  	private toastr = inject(ToastrService);
	

  	constructor() {
  	  // Leggi lo stato di navigazione (i dati passati)
  	  const nav: Navigation | null = this.router.getCurrentNavigation();
  	  this.restaurantItem = nav?.extras.state?.['restaurantItem'] ?? undefined;
  	  this.images = nav?.extras.state?.['images'] ?? [];

  	  if(this.restaurantItem == undefined|| this.images.length == 0){
  	    this.toastr.error("Sorry, try later", "Error");
  	    this.router.navigate(['/']);
  	  }

	  this.fetchReviews();
	

  	}


	fetchReviews() {

		this.restService.getReviewsByResturant(this.restaurantItem.id,this.page).subscribe({
  	    next: (data) => {
		
  	      this.reviews = data;
		  if(this.reviews.length == 0){
			this.toastr.info("No reviews found", "Info");
		  }
	
  	    },
  	    error: (err) => {
		
  	        this.toastr.error("Sorry, try later", "Error");
  	        this.router.navigate(['/']);
	
  	    }
  	  });



	}


  	goBack() {
  	  this.location.back();
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

	prevReview() {
    	if (this.page > 1) {
      		this.page--;
			this.fetchReviews();

    	}
  	}

  	nextReview() {
    	if (this.reviews && this.reviews.length > 0) { 
      		this.page++;
			this.fetchReviews();
    	}
  	}

	goMap() {
		this.router.navigate(['/restaurant-map'], { state: { restaurants: [this.restaurantItem] } });

	}

	goToAddReview() {
		this.router.navigate(['/add-review'], { state: { restaurant: this.restaurantItem } });
	}



}
