import { Component} from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,  
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchField: string = "";

  search(){
    console.log(this.searchField);
  }


}
