import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { NgxRetroGridComponent } from '@omnedia/ngx-retro-grid';

@Component({
  selector: 'app-ngo-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ngo-dashboard.component.html',
  styleUrls: ['./ngo-dashboard.component.css']
})
export class NgoDashboardComponent {
  // Example data
  isLoggedIn = signal(false);
  ngoName = signal('Helping Hands International');
  aidPosted = signal(42);
  peopleHelped = signal(175);

  // Example functions
  logout() {
    this.isLoggedIn.set(false);
  }

  login() {
    this.isLoggedIn.set(true);
  }
}
