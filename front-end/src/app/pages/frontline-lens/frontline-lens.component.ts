import { Component, signal } from '@angular/core';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import { GooglemapComponent } from '../../components/googlemap/googlemap.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frontline-lens',
  standalone: true,
  imports: [
    NgxFlickeringGridComponent,
    GooglemapComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './frontline-lens.component.html',
  styleUrls: ['./frontline-lens.component.css']
})
export class FrontlineLensComponent {
  frontLines = signal<any[]>([]);
  useMockData = true; // Set to false when you want to use real API data

  ngOnInit(): void {
    if (this.useMockData) {
      this.frontLines.set(this.generateMockData());
    } else {
      fetch("http://127.0.0.1:5000/api/get/frontlines")
        .then(res => res.json())
        .then(res => this.frontLines.set(res))
        .catch(err => {
          console.error('Error fetching frontlines:', err);
          // Fallback to mock data if API fails
          this.frontLines.set(this.generateMockData());
        });
    }
  }

  generateMockData() {
    return [
      {
        _id: '1',
        title: 'Food Distribution in Border Camp',
        message: 'Volunteers distributed meals to 500+ refugees today at the makeshift camp near the border. Supplies are running low though.',
        image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600',
        audioPresent: true,
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        lat: 48.8566,
        long: 2.3522,
        postedOn: new Date('2025-04-15T14:30:00Z').toISOString()
      },
      {
        _id: '2',
        title: 'Medical Tent Set Up in Central Square',
        message: 'Doctors Without Borders has established a temporary medical facility in the city center. Treating 100+ patients daily for injuries and illnesses.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
        audioPresent: false,
        lat: 50.4501,
        long: 30.5234,
        postedOn: new Date('2025-04-14T09:15:00Z').toISOString()
      },
      {
        _id: '3',
        title: 'Shelter Construction Progress',
        message: 'Day 3 of building temporary shelters in the western district. We\'ve completed 12 units so far, aiming for 50 by end of week. Volunteers needed!',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600',
        audioPresent: true,
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        lat: 49.8397,
        long: 24.0297,
        postedOn: new Date('2025-04-13T16:45:00Z').toISOString()
      },
      {
        _id: '4',
        title: 'Water Purification System Installed',
        message: 'New water filtration system operational at the main refugee camp. Providing clean drinking water for 2000+ people daily.',
        image: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?w=600',
        audioPresent: false,
        lat: 51.5074,
        long: 0.1278,
        postedOn: new Date('2025-04-12T11:20:00Z').toISOString()
      },
      {
        _id: '5',
        title: 'Nighttime Evacuation Alert',
        message: 'URGENT: Shelling reported in eastern districts. Emergency evacuation routes activated. Follow volunteers to safe zones.',
        image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=600',
        audioPresent: true,
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        lat: 52.2297,
        long: 21.0122,
        postedOn: new Date('2025-04-11T23:10:00Z').toISOString()
      }
    ];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
