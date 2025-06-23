import { Component, inject, Input } from '@angular/core';
import { ReviewItem } from '../_models/review-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { AuthService } from '../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VoteItem } from '../_models/vote-item.type';

@Component({
  selector: 'app-deletable-review-item',
  imports: [],
  templateUrl: './deletable-review-item.component.html',
  styleUrl: './deletable-review-item.component.scss'
})
export class DeletableReviewItemComponent {

	@Input({ required: true }) reviewItem: ReviewItem;
  	restService = inject(RestBackendService);
  	authService = inject(AuthService);
  	toastr = inject(ToastrService);
  	router = inject(Router);
	votes: VoteItem[] = [];
	userVotes: VoteItem[] = [];


	ngOnInit() {

		if(localStorage.getItem('ReviewDeleted') === "true") {
			localStorage.removeItem('ReviewDeleted');
			this.toastr.success("Review deleted successfully", "Success");
	  	}

		this.restService.getVotesOfReview(
			this.reviewItem.id
		).subscribe({
			next: (votes) => {
				this.votes = votes;

				if (this.votes.length > 0 && this.authService.isUserAuthenticated()) {
					// Example: filter votes by a condition, e.g., only upvotes
					this.userVotes = this.votes.filter(vote => vote.UserEmail == this.authService.getUser());
			
				}
				console.log(this.votes);
				console.log(this.userVotes);
			}
		});

		
	
  	}

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
							this.userVotes = [{
								isUpVote: false,
								ReviewId: this.reviewItem.id,
								UserEmail: this.authService.getUser()??""
							}];
						}
					});
					
				}else{
					this.reviewItem.downvotes--;
					this.userVotes = [];
					this.toastr.success("Vote deleted successfully", "Success");
				}	  					
  	  	    },
  	  	    complete: () => {
  	  	    	this.toastr.success(`You have down vote`,`Congrats ${this.authService.getUser()}!`);
				this.reviewItem.downvotes++;
				this.userVotes = [{
					isUpVote: false,
					ReviewId: this.reviewItem.id,
					UserEmail: this.authService.getUser()??""
				}];
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
							this.userVotes = [{
								isUpVote: true,
								ReviewId: this.reviewItem.id,
								UserEmail: this.authService.getUser()??""
							}];
						}
					});
					
				}else{
					this.reviewItem.upvotes--;
					this.userVotes = [];
					this.toastr.success("Vote deleted successfully", "Success");
				}	  					
  	  	    },
  	  	    complete: () => {
  	  	    	this.toastr.success(`You have up vote`,`Congrats ${this.authService.getUser()}!`);
				this.reviewItem.upvotes++;
				this.userVotes = [{
					isUpVote: true,
					ReviewId: this.reviewItem.id,
					UserEmail: this.authService.getUser()??""
				}];
  	  	    }
  	  	});
	}

	deleteRestaurant() {
		this.restService.RemoveReview(this.reviewItem.id).subscribe({
  	    next: (data) => {
			localStorage.setItem('ReviewDeleted', "true");
			window.location.reload();		
  	      
	
  	    },
  	    error: (err) => {
  	      this.toastr.error("Sorry, try later", "Error");       
  	    }
  	  });
	}

}
