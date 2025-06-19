import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { RestaurantItemComponent } from '../restaurant-item/restaurant-item.component';
import {AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map-restaurant',
  imports: [RestaurantItemComponent],
  templateUrl: './map-restaurant.component.html',
  styleUrl: './map-restaurant.component.scss'
})
export class MapRestaurantComponent implements AfterViewInit {
  	location = inject(Location);
	router = inject(Router);			
	restaurants: RestaurantItem[] = [];
	private map!: leaflet.Map;


  	
  	constructor() {
  	  // Leggi lo stato di navigazione (i dati passati)
  	  const nav = this.router.getCurrentNavigation();
  	  this.restaurants = nav?.extras.state?.['restaurants'] ?? [];
  	}

	goBack() {
  	  this.location.back();
	 
  	}

	 

  	ngAfterViewInit(): void {
    	this.initMap();
  	}

  	private initMap(): void {
    	// this.map = leaflet.map('map').setView([40.5009, 14.1455], 10);
		this.map = leaflet.map('map', {center: [ 40.5009, 14.1455 ], zoom: 13});
		
		const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      		maxZoom: 18,
      		minZoom: 3,
      		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    	});

    	tiles.addTo(this.map);

		this.restaurants.forEach(restaurant => {
	  		if (restaurant.latitude && restaurant.longitude) {
				leaflet.marker([restaurant.latitude, restaurant.longitude])
		  			.addTo(this.map)
		  			.bindPopup(`<b>${restaurant.name}</b><br>${restaurant.type}`)
		  			.openPopup();
	  		}
		});
    	

    	// 	leaflet.marker([40.5009, 14.1455]).addTo(this.map)
      	// 		.bindPopup('🍕 Ristorante a Napoli')
      	// 		.openPopup();
  	}
	

}
