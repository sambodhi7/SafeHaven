import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HelpPost } from '../../../shared-types';

interface AvailResponse {
  id: string;
  postId: string;
  name: string;
  contact: string;
  location: string;
  message: string;
  submittedAt: Date;
}

@Component({
  selector: 'app-post-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-help.component.html',
  styleUrls: ['./post-help.component.css']
})
export class PostHelpComponent {
  helpType = signal('Food');
  location = signal('');
  description = signal('');
  capacity = signal(0);
  availableFrom = signal('');
  availableTo = signal('');

  // Mock data for avail responses
  availResponses = signal<AvailResponse[]>([
    {
      id: '1',
      postId: '1',
      name: 'Anna Petrova',
      contact: 'anna@example.com',
      location: 'Kyiv',
      message: 'Need food for my family of 4',
      submittedAt: new Date('2025-04-15')
    },
    {
      id: '2',
      postId: '1',
      name: 'Ivan Ivanov',
      contact: '+380991234567',
      location: 'Kyiv, Podil district',
      message: '',
      submittedAt: new Date('2025-04-16')
    }
  ]);

  activePosts = signal<HelpPost[]>([
    {
      id: '1',
      ngoName: 'Your NGO Name',
      location: 'Kyiv, Ukraine',
      helpType: 'Food',
      description: 'Daily meals for displaced families',
      availableFrom: new Date('2025-04-14'),
      availableTo: new Date('2025-04-18'),
      initialQuantity: 50,
      remainingQuantity: 48, // Updated to reflect mock responses
      postedDate: new Date(),
      isVerified: true
    }
  ]);

  // Modal state
  showResponsesModal = signal(false);
  currentPostId = signal<string | null>(null);
  currentPostResponses = signal<AvailResponse[]>([]);

  submitHelp() {
    const fromDate = this.availableFrom() ? new Date(this.availableFrom()) : undefined;
    const toDate = this.availableTo() ? new Date(this.availableTo()) : undefined;

    const newPost: HelpPost = {
      id: Date.now().toString(),
      ngoName: 'Your NGO Name',
      location: this.location(),
      helpType: this.helpType(),
      description: this.description(),
      availableFrom: fromDate!,
      availableTo: toDate,
      initialQuantity: this.capacity(),
      remainingQuantity: this.capacity(),
      postedDate: new Date(),
      isVerified: true
    };

    this.activePosts.update(posts => [...posts, newPost]);

    // Reset fields
    this.helpType.set('Food');
    this.location.set('');
    this.description.set('');
    this.capacity.set(0);
    this.availableFrom.set('');
    this.availableTo.set('');
  }

  removePost(id: string) {
    this.activePosts.update(posts => posts.filter(post => post.id !== id));
    // Also remove associated responses
    this.availResponses.update(responses =>
      responses.filter(response => response.postId !== id)
    );
  }

  // Open modal with responses for a specific post
  showPostResponses(postId: string) {
    this.currentPostId.set(postId);
    this.currentPostResponses.set(
      this.availResponses().filter(response => response.postId === postId)
    );
    this.showResponsesModal.set(true);
  }

  closeResponsesModal() {
    this.showResponsesModal.set(false);
    this.currentPostId.set(null);
    this.currentPostResponses.set([]);
  }
}
