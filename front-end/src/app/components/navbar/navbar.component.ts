import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Clear Cut', path: '/clear-cut' },
    { label: 'Echoes of Silence', path: '/echoes-of-silence' },
    { label: 'Frontline Lens', path: '/frontline-lens' },
    { label: 'Voices of War', path: '/voices-of-war' },
    { label: 'Where Names Rest', path: '/where-names-rest' },
    { label: 'Help', path: '/help' },
    { label: 'Request Help', path: '/request' }
  ];
}
