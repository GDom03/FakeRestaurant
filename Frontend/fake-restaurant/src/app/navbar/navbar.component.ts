import { Component, inject} from '@angular/core';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestBackendService } from '../_services/rest-backend/rest-backend.service';
import { RestaurantItem } from '../_models/restaurant-item.type';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,  
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchField: string = "";
  private toastr = inject(ToastrService);
  restService = inject(RestBackendService);
  authService = inject(AuthService);
  restaurants: RestaurantItem[] = [];
  router = inject(Router);


  search(){
  
    if(this.searchField === "" || this.searchField.trim() === ""){
      
      this.toastr.warning('Enter the name of the restaurant you want to search for.', 'Warning');
      return;
    }
    console.log(this.searchField);
    this.restService.getResturantsByName(this.searchField).subscribe({
      next: (data) => {
        console.log(data);
        this.restaurants = data;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => { // force reload
          this.router.navigateByUrl('/search-results');
        });
        //this.router.navigate(['/search-results'], { state: { restaurants: data, searchField : this.searchField } });
        //....
      },
      error: (err) => {
  
        this.toastr.error("Sorry, try later", "Error");
        
      }
    });


  
  }


}
