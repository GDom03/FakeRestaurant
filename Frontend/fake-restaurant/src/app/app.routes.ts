import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component'
import { ManageAccountComponent } from './manage-account/manage-account.component';

import { authGuard } from './_guards/auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserRestaurantsComponent } from './user-restaurants/user-restaurants.component';
import { MapRestaurantComponent } from './map-restaurant/map-restaurant.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';


export const routes: Routes = [

    {
        path: "home",
        component: HomepageComponent,
        title: "Fake Restaurant Home"
    },{
        path: "login",
        component: LoginComponent,
        title: "Fake Restaurant Login"
    },
    {
        path: "search-results",
        component: SearchResultsComponent,
        title: "Fake Restaurant Search Results"
    },
    {
        path: "restaurants/:name",
        component: RestaurantDetailComponent,
        title: "Fake Restaurant Restaurant Detail",
    },
    {
        path: "manage-account",
        component: ManageAccountComponent,
        title: "Fake Restaurant Manage Account",
        canActivate: [authGuard]
    },
    {
        path: "signup",
        component: SignupComponent,
        title: "Fake Restaurant Signup",
    },
	{
        path: "user-restaurants",
        component: UserRestaurantsComponent,
        title: "Fake Restaurant User Restaurants",
        canActivate: [authGuard]
    },
	{
        path: "restaurant-map",
        component: MapRestaurantComponent,
        title: "Fake Restaurant Map Restaurants",
    },
	{
        path: "user-reviews",
        component: UserReviewsComponent,
        title: "Fake Restaurant User Reviews",
        canActivate: [authGuard]
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    },

];
