import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';

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
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    },

];
