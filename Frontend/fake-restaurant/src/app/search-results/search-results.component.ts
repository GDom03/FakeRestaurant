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
  private toastr = inject(ToastrService);;

  constructor(private router: Router) {
    // Leggi lo stato di navigazione (i dati passati)
    const nav: Navigation | null = this.router.getCurrentNavigation();
    this.restaurants = nav?.extras.state?.['restaurants'] ?? [];
    this.searchField = nav?.extras.state?.['searchField'] ?? "";

    if(this.restaurants.length == 0|| this.searchField.length == 0){
      this.router.navigate(['/']);
    }

  }

  search(page: number){
    this.restService.getResturantsByName(this.searchField,page).subscribe({
      next: (data) => {
        console.log(data);
        this.restaurants = data;

      },
      error: (err) => {
  
        this.toastr.error(err.message, err.statusText)
        
      }
    });
  }

  nextPage(){
    if(this.restaurants.length > 0){
      this.search(++this.page);
    }
    
  }

  prevPage(){
    if(this.page > 1){
      this.search(--this.page);
    }
    
  }

}
