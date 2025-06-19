import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestaurantItem } from '../../_models/restaurant-item.type';
import { ImageItem } from '../../_models/image-item.type';
import { ReviewItem } from '../../_models/review-item.type';
import { AuthRequest } from './auth-request.type';
import { AuthResponse } from './auth-response.type';
import { VoteRequest } from './vote-request.type';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {


	url = "http://localhost:3000"
	imageurl = "http://localhost:9000/fake-restaurant/"

	constructor(private http: HttpClient) { }	
	
	httpOptions = {
	  	headers: new HttpHeaders({
	    	'Content-Type': 'application/json'
	  	})
	};

	login(loginRequest: AuthRequest){
	  	const url = `${this.url}/auth`; 
	  	return this.http.post<AuthResponse>(url, loginRequest, this.httpOptions);
	}	


	signup(signupRequest: AuthRequest){
	  	const url = `${this.url}/signup`; 
	  	
		return this.http.post(url, signupRequest, this.httpOptions);
	}	


	getLastResturants(page: number = 1, limit: number = 3) {	
	  	let url = `${this.url}/restaurants?page=${page}&limit=${limit}&sort=updatedAt`; 

	  	return this.http.get<RestaurantItem[]>(url, this.httpOptions);
	}

	getUserResturants(page: number, limit: number) {
		let url = `${this.url}/restaurants?page=${page}&limit=${limit}&sort=updatedAt&UserEmail=${localStorage.getItem('email') ?? ""}`; 

	  	return this.http.get<RestaurantItem[]>(url, this.httpOptions);
	}	


	getResturantsByName(name:string, page: number = 1, limit: number = 3) {	
	  	let url = `${this.url}/restaurants?page=${page}&limit=${limit}&sort=updatedAt&name=${name}`; 

	  	return this.http.get<RestaurantItem[]>(url, this.httpOptions);
	}	


	getReviewsByResturant(id:number, page: number = 1, limit: number = 3) {	
	  	let url = `${this.url}/reviews/${id}/?page=${page}&limit=${limit}&sort=upvotes`; 	
	  	return this.http.get<ReviewItem[]>(url, this.httpOptions);
	}	


	getImagesOfResturant(idRestaurant: number){	
	  	let url = `${this.url}/images/${idRestaurant}`;

	  	return this.http.get<ImageItem[]>(url, this.httpOptions);	
	}

	voteReview(voteRequest: VoteRequest) {

    	let url = `${this.url}/votes`; 

		return this.http.post<VoteRequest>(url, voteRequest, this.httpOptions);
  	}

	
	deleteVote(ReviewId: number) {

		let url = `${this.url}/votes/${ReviewId}`; 
		return this.http.delete(url, this.httpOptions);
	}

	getRemoveResturant(idRestaurant: number) {
		let url = `${this.url}/restaurants/${idRestaurant}`; 
		return this.http.delete(url, this.httpOptions);
	}

}
