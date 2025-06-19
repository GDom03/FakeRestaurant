import { Component, inject } from '@angular/core';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ReviewItem } from '../_models/review-item.type';
import { ToastrService } from 'ngx-toastr';
import { DeletableReviewItemComponent } from '../deletable-review-item/deletable-review-item.component';

@Component({
  selector: 'app-user-reviews',
  imports: [DeletableReviewItemComponent],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.scss'
})
export class UserReviewsComponent {
	restService = inject(RestBackendService);
  	page: number = 1;
  	reviews: ReviewItem[] = [];
  	private toastr = inject(ToastrService);

  	ngOnInit() {
  	  this.fetchUserRestaurants();  
  	}

  	fetchUserRestaurants(page: number = 1, limit: number = 3){
  	  this.restService.getUserReviews(page,limit).subscribe({
  	    next: (data) => {
  	      
  	      this.reviews = data;
  	    },
  	    error: (err) => {
		
  	      this.toastr.error("Sorry try later", "Error")
	
  	    }
  	  });
	
  	}

  	nextPage(){
  	  if(this.reviews.length > 0){
  	    this.fetchUserRestaurants(++this.page);
  	  }
	
  	}

  	prevPage(){
  	  if(this.page > 1){
  	    this.fetchUserRestaurants(--this.page);
  	  }
	
  	}



}
