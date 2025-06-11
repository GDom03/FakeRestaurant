import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchQuery: string = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Implementa la logica di ricerca
    }
  }

  onProfileClick() {
    console.log('Profile clicked');
    // Implementa la logica del profilo
  }

}
