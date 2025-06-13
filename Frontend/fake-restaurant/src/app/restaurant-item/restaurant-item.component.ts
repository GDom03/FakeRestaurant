import { Component, inject, Input } from '@angular/core';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { ImageItem } from '../_models/image-item.type';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';

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
  toastr: any;
  
  ngOnInit() {
    this.restService.getImagesOfResturant(this.restaurantItem.id).subscribe({
      next: (data) => {
        //console.log(data);
        this.images = data;
        // this.images.forEach((item)=>{console.log(item.image)});
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText)        
      }
    });
    
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
