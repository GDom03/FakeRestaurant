import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';

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
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
    },

];
