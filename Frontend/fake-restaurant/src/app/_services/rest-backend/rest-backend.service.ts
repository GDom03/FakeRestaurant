import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestaurantItem } from '../../_models/restaurant-item.type';
import { ImageItem } from '../../_models/image-item.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {

  url = "http://localhost:3000" 
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getLastResturants(page: number = 1, limit: number = 3) {

    let url = `${this.url}/restaurants?page=${page}&limit=${limit}&sort=updatedAt`; 
  
    return this.http.get<RestaurantItem[]>(url, this.httpOptions);
  }

  getImagesOfResturant(idRestaurant: number){

    let url = `${this.url}/images/${idRestaurant}`;
    //console.log(url);
    return this.http.get<ImageItem[]>(url, this.httpOptions); 
  }


}
