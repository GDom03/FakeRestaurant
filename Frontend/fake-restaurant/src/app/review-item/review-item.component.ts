import { Component, inject, Input } from '@angular/core';
import { ReviewItem } from '../_models/review-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-review-item',
  imports: [],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss'
})
export class ReviewItemComponent {

  	@Input({ required: true }) reviewItem: ReviewItem;
  	restService = inject(RestBackendService);
  	authService = inject(AuthService);
  	toastr = inject(ToastrService);
  	router = inject(Router);
	upvoted: boolean = false;

  	downvote() {
		if (this.authService.isUserAuthenticated() === false) {
			this.toastr.warning("You must be logged in to vote", "Warning");
			return;

		}
  	  	this.restService.voteReview({
  	  	    reviewId: this.reviewItem.id,
  	  	    isUpVote: false,
  	  	}).subscribe({
  	  	    error: (err) => {
					this.restService.deleteVote(
							this.reviewItem.id,
				  		).subscribe({
							error: (err) => {
								this.toastr.error("Sorry try later", "Error");
							},	
					});		
					if(err.error.isUpVote === true){
						
						this.restService.voteReview({
  	  	    				reviewId: this.reviewItem.id,
  	  	    				isUpVote: false,
  	  					}).subscribe({
							error: (err) => {
								this.toastr.error("Sorry try later", "Error");
							},
							complete: () => {
								this.toastr.success(`You have down vote`,`Congrats ${this.authService.getUser()}!`);
								this.reviewItem.upvotes--;
								this.reviewItem.downvotes++;
							}
						});
						
					}else{
						this.reviewItem.downvotes--;
						this.toastr.success("Vote deleted successfully", "Success");
					}	  					
  	  	    },
  	  	    complete: () => {
  	  	      this.toastr.success(`You have down vote`,`Congrats ${this.authService.getUser()}!`);
				  this.reviewItem.downvotes++;

  	  	    }
  	  	});
  	}


  	upvote() {
		if (this.authService.isUserAuthenticated() === false) {
			this.toastr.warning("You must be logged in to vote", "Warning");
			return;

		}
  	  	this.restService.voteReview({
  	  	    reviewId: this.reviewItem.id,
  	  	    isUpVote: true,
  	  	}).subscribe({
  	  	    error: (err) => {
					this.restService.deleteVote(
							this.reviewItem.id,
				  		).subscribe({
							error: (err) => {
								this.toastr.error("Sorry try later", "Error");
							},	
					});		
					if(err.error.isUpVote === false){
						this.restService.voteReview({
  	  	    				reviewId: this.reviewItem.id,
  	  	    				isUpVote: true,
  	  					}).subscribe({
							error: (err) => {
								this.toastr.error("Sorry try later", "Error");
							},
							complete: () => {
								this.toastr.success(`You have up vote`,`Congrats ${this.authService.getUser()}!`);
								this.reviewItem.downvotes--;
								this.reviewItem.upvotes++;
							}
						});
						
					}else{
						this.reviewItem.upvotes--;
						this.toastr.success("Vote deleted successfully", "Success");
					}	  					
  	  	    },
  	  	    complete: () => {
  	  	      this.toastr.success(`You have up vote`,`Congrats ${this.authService.getUser()}!`);
				  this.reviewItem.upvotes++;

  	  	    }
  	  	});
	}

}	
