import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestaurantItem } from '../../_models/restaurant-item.type';
import { ImageItem } from '../../_models/image-item.type';
import { ReviewItem } from '../../_models/review-item.type';

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

  getResturantsByName(name:string, page: number = 1, limit: number = 3) {

    let url = `${this.url}/restaurants?page=${page}&limit=${limit}&sort=updatedAt&name=${name}`; 
  
    return this.http.get<RestaurantItem[]>(url, this.httpOptions);
  }

  getReviewsByResturant(id:number, page: number = 1, limit: number = 3) {

    let url = `${this.url}/reviews/${id}/?page=${page}&limit=${limit}&sort=upvotes`; 
    console.log(url);
    return this.http.get<ReviewItem[]>(url, this.httpOptions);
  }

  getImagesOfResturant(idRestaurant: number){

    let url = `${this.url}/images/${idRestaurant}`;
    //console.log(url);
    return this.http.get<ImageItem[]>(url, this.httpOptions); 
  }


}
