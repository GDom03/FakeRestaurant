import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { RestaurantItemComponent } from '../restaurant-item/restaurant-item.component';

@Component({
  selector: 'app-map-restaurant',
  imports: [RestaurantItemComponent],
  templateUrl: './map-restaurant.component.html',
  styleUrl: './map-restaurant.component.scss'
})
export class MapRestaurantComponent {
  	location = inject(Location);
	router = inject(Router);			
	restaurants: RestaurantItem[] = [];
  	
  	constructor() {
  	  // Leggi lo stato di navigazione (i dati passati)
  	  const nav = this.router.getCurrentNavigation();
  	  this.restaurants = nav?.extras.state?.['restaurants'] ?? [];
  	}

	goBack() {
  	  this.location.back();
  	}

}
