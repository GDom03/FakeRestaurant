import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { AuthService } from '../_services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantItem } from '../_models/restaurant-item.type';

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent {


	submitted: boolean = false;
	overall: number;
	restaurant: RestaurantItem;
  	toastr = inject(ToastrService);
  	restService = inject(RestBackendService);
  	router = inject(Router);
	location = inject(Location);
  	authService = inject(AuthService);
  	addReviewForm = new FormGroup({
  	  
		title: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(255),  
			]
		),
    	
		content: new FormControl('', [
			Validators.required, 
			Validators.minLength(10),
			Validators.maxLength(255),  ]
		),
    	
		serviceRating: new FormControl(null, [
			Validators.required, 
			Validators.min(1), 
			Validators.max(5)]
		),
    	
		qualityPriceRating: new FormControl(null, [
			Validators.required, 
			Validators.min(1), 
			Validators.max(5)]
		),
    	
		foodRating: new FormControl(null, [
			Validators.required, 
			Validators.min(1), 
			Validators.max(5)]
		),

    	atmosphereRating: new FormControl(null, [
			Validators.required, 
			Validators.min(1), 
			Validators.max(5)]
		),

	  
  	});

	constructor() {
  	  // Leggi lo stato di navigazione (i dati passati)
  	  const nav = this.router.getCurrentNavigation();
  	  this.restaurant = nav?.extras.state?.['restaurant'] ?? [];
  	}

	goBack() {
		this.location.back();
	}


	handleAddReview() {
		this.submitted = true;
		if(this.addReviewForm.invalid){
      		this.toastr.error("The data you provided is invalid!", "Oops! Invalid data!");
			
    	}else{
			this.overall = (this.addReviewForm.value.serviceRating ?? 1 as number) + (this.addReviewForm.value.qualityPriceRating ?? 1) + (this.addReviewForm.value.foodRating ?? 1) + (this.addReviewForm.value.atmosphereRating ?? 1);
			this.overall /= 4; 
			
			
			this.restService.addReview({
      	  		title: this.addReviewForm.value.title as string,
      	  		content: this.addReviewForm.value.content as string,
				overallRating: this.overall,
				serviceRating: this.addReviewForm.value.serviceRating ?? 1 as number,
				qualityPriceRating: this.addReviewForm.value.qualityPriceRating ?? 1 as number,
				foodRating: this.addReviewForm.value.foodRating ?? 1 as number,
				atmosphereRating: this.addReviewForm.value.atmosphereRating ?? 1 as number,
				restaurantId: this.restaurant.id as number,
      			}).subscribe({
      	  			next: (msg) => {

      	    		  	this.toastr.success(`Review submitted successfully!`,`Success`);

      	  			},
      	 			 	error: (err) => {
      	    				this.toastr.error("Please fill all fields correctly before submitting the review.", "Submission Error");
      	  			},
      	  			complete: () => {
						this.submitted = false;
						this.addReviewForm.reset();
						

      	  		}
      		});


		}

		
	}

}
