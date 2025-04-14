import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refugee-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './refugee-requests.component.html',
  styleUrls: ['./refugee-requests.component.css']
})
export class RefugeeRequestsComponent {
  filterType = signal('all');
  filterLocation = signal('');

  requests = signal([
    {
      id: 1,
      type: 'food',
      location: 'Kyiv',
      description: 'Need food for family of 4',
      people: 4,
      date: new Date(),
      urgent: true
    },
    {
      id: 2,
      type: 'shelter',
      location: 'Lviv',
      description: 'Looking for temporary housing',
      people: 2,
      date: new Date(Date.now() - 86400000),
      urgent: false
    },
    {
      id: 3,
      type: 'medical',
      location: 'Warsaw',
      description: 'Need prescription medication',
      people: 1,
      date: new Date(Date.now() - 172800000),
      urgent: true
    }
  ]);

  filteredRequests = computed(() => {
    return this.requests().filter(request => {
      const typeMatch = this.filterType() === 'all' || request.type === this.filterType();
      const locationMatch = request.location.toLowerCase().includes(this.filterLocation().toLowerCase());
      return typeMatch && locationMatch;
    });
  });

  markAsHelped(id: number) {
    this.requests.update(requests => requests.filter(request => request.id !== id));
  }
}
