import { Component, inject } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { RestaurantItemComponent } from '../restaurant-item/restaurant-item.component';

@Component({
  selector: 'app-homepage',
  imports: [RestaurantItemComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  restService = inject(RestBackendService);
  page: number = 1;
  restaurants: RestaurantItem[] = [];
  toastr: any;

  ngOnInit() {
    this.fetchLastRestaurants();  
  }

  fetchLastRestaurants(page: number = 1, limit: number = 3){
    this.restService.getLastResturants(page,limit).subscribe({
      next: (data) => {
        // console.log(data);
        this.restaurants = data;
      },
      error: (err) => {
  
        this.toastr.error(err.message, err.statusText)
        
      }
    });
    
  }

  nextPage(){
    if(this.restaurants.length > 0){
      this.fetchLastRestaurants(++this.page);
    }
    
  }

  prevPage(){
    if(this.page > 1){
      this.fetchLastRestaurants(--this.page);
    }
    
  }

}
