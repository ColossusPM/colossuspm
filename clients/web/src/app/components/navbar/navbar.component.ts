import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToProjects() {
    this.router.navigate(['/projects']);
  }
}