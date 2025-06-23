import { Component, inject } from '@angular/core';
import { Router, NavigationExtras, Navigation } from '@angular/router';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { RestaurantItemComponent } from '../restaurant-item/restaurant-item.component';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-results',
  imports: [RestaurantItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  	restaurants: RestaurantItem[] = [];
  	searchField: string;
  	page: number = 1;
  	restService = inject(RestBackendService);
  	toastr = inject(ToastrService);;
	router = inject(Router);

	ngOnInit() {
		if(localStorage.getItem('searchField') === null || localStorage.getItem('searchField') === undefined){
			return;
		}

		this.searchField = localStorage.getItem('searchField') ?? "";
		localStorage.removeItem('searchField'); // Clear the search field from local storage
		
		this.page = parseInt(localStorage.getItem('page') ?? "1");
		localStorage.removeItem('page'); // Clear the page from local storage
		
		this.restService.getResturantsByName(this.searchField,this.page).subscribe({
  	    	next: (data) => {
				
  	      		this.restaurants = data;
				
				if(this.restaurants == undefined || this.restaurants.length == 0){
					this.toastr.info("No search results", "Info");
				}
  	    	},
  	    	error: (err) => {
		
  	      		this.toastr.error("Sorry, try later", "Error");
	
  	    	}
  	  	});

		
	}

  	search(){	
		
		localStorage.setItem('searchField', this.searchField);
		localStorage.setItem('page', this.page.toString()); 
		window.location.reload(); 

  	}

  	nextPage(){
  		if(this.restaurants.length > 0){
			++this.page;
  	    	this.search();
  	  	}
	
  	}

  	prevPage(){
  	  	if(this.page > 1){
			--this.page;
  	    	this.search();
	  	}
	
  	}

	goMap() {
		if(this.restaurants.length == 0){
			this.toastr.warning('No restaurants found to display on the map.', 'Warning');
			return;
		}
		localStorage.setItem('searchField', this.searchField);
		localStorage.setItem('page', this.page.toString()); 
		this.router.navigate(['/restaurant-map'], { state: { restaurants: this.restaurants } });

	}

}
