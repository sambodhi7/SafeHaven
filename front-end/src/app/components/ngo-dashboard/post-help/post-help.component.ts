import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-help.component.html',
  styleUrls: ['./post-help.component.css']
})
export class PostHelpComponent {
  helpType = signal('food');
  locations = signal('');
  description = signal('');
  capacity = signal(0);

  activePosts = signal([
    {
      id: 1,
      type: 'food',
      locations: 'Kyiv, Lviv',
      description: 'Daily meals for displaced families',
      date: new Date(),
      capacity: 50
    },
    {
      id: 2,
      type: 'shelter',
      locations: 'Warsaw',
      description: 'Temporary housing for 2 weeks',
      date: new Date(Date.now() - 86400000),
      capacity: 12
    }
  ]);

  submitHelp() {
    this.activePosts.update(posts => [
      ...posts,
      {
        id: Date.now(),
        type: this.helpType(),
        locations: this.locations(),
        description: this.description(),
        date: new Date(),
        capacity: this.capacity()
      }
    ]);

    // Reset form
    this.helpType.set('food');
    this.locations.set('');
    this.description.set('');
    this.capacity.set(0);
  }

  removePost(id: number) {
    this.activePosts.update(posts => posts.filter(post => post.id !== id));
  }
}
