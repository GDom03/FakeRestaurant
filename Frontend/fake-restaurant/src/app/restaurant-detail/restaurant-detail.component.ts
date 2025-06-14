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
  restService = inject(RestBackendService);
  private toastr = inject(ToastrService);
  

  constructor(private router: Router,private location: Location) {
    // Leggi lo stato di navigazione (i dati passati)
    const nav: Navigation | null = this.router.getCurrentNavigation();
    this.restaurantItem = nav?.extras.state?.['restaurantItem'] ?? undefined;
    this.images = nav?.extras.state?.['images'] ?? [];

    if(this.restaurantItem == undefined|| this.images.length == 0){
      this.toastr.error("Sorry, try later", "Error");
      this.router.navigate(['/']);
    }

    this.restService.getReviewsByResturant(this.restaurantItem.id,this.page).subscribe({
      next: (data) => {
        
        this.reviews = data;
         
    
        if(this.reviews == undefined|| this.reviews.length == 0){
          this.toastr.error("Sorry, try later", "Error");
          this.router.navigate(['/']);
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
}
