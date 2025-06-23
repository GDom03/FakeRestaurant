import { Component, inject, Input } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { ImageItem } from '../_models/image-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-item',
  imports: [],
  standalone: true,
  templateUrl: './restaurant-item.component.html',
  styleUrl: './restaurant-item.component.scss'
})
export class RestaurantItemComponent {

  @Input({ required: true }) restaurantItem: RestaurantItem;
  images: ImageItem[];
  imageNumber: number = 0;
  restService = inject(RestBackendService);
  private toastr = inject(ToastrService);
  router = inject(Router);
  srcImg: string;
  
  
  ngOnInit() {
    this.restService.getImagesOfResturant(this.restaurantItem.id).subscribe({
      next: (data) => {
        this.images = data;
		try {
			
			for(let i = 0; i < this.images.length; i++) {
				this.images[i].image = this.restService.imageurl + this.images[i].image;
		  	}
			this.srcImg = this.images[this.imageNumber].image ?? 'assets/default.svg';	
		} catch (error) {
			this.srcImg = 'assets/default.svg';
		}
		
  
      },
      error: (err) => {
        this.toastr.error("Sorry, try later", "Error");       
      }
    });
    
  }

  prevImage() {
    if (this.imageNumber > 0) {
      this.imageNumber--;
	  this.srcImg = this.images[this.imageNumber].image ?? 'assets/default.svg';
    }
  }

  nextImage() {
    if (this.imageNumber < this.images.length - 1) {
      this.imageNumber++;
	  this.srcImg = this.images[this.imageNumber].image ?? 'assets/default.svg';
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


}
