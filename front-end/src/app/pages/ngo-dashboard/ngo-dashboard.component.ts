import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { NgxRetroGridComponent } from '@omnedia/ngx-retro-grid';
import { PostHelpComponent } from '../../components/ngo-dashboard/post-help/post-help.component';
import { RefugeeRequestsComponent } from '../../components/ngo-dashboard/refugee-requests/refugee-requests.component';
import { PublicDonationsComponent } from '../../components/ngo-dashboard/public-donations/public-donations.component';
import { StatsCardsComponent } from "../../components/ngo-dashboard/stats-cards/stats-cards.component";


@Component({
  selector: 'app-ngo-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostHelpComponent,
    RefugeeRequestsComponent,
    PublicDonationsComponent,
    StatsCardsComponent
  ],
  templateUrl: './ngo-dashboard.component.html',
  styleUrls: ['./ngo-dashboard.component.css']
})
export class NgoDashboardComponent {
  isLoggedIn = signal(false);
  showSignup = signal(false);
  activeTab = signal('post-help');
  ngoName = signal('Helping Hands International');

  tabs = [
    { id: 'post-help', label: 'Post Help' },
    { id: 'requests', label: 'Refugee Requests' },
    { id: 'donations', label: 'Public Donations' }
  ];

  stats = signal([
    { id: 1, icon: '📦', value: 42, label: 'Resources Shared' },
    { id: 2, icon: '👥', value: 175, label: 'People Assisted' },
    { id: 3, icon: '📋', value: 12, label: 'Active Posts' },
    { id: 4, icon: '⚠️', value: 5, label: 'Urgent Requests' }
  ]);

  login() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }
}
