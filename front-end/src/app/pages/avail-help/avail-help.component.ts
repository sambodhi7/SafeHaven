import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelpPost } from '../../shared-types';

@Component({
  selector: 'app-avail-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avail-help.component.html',
  styleUrls: ['./avail-help.component.css']
})
export class AvailHelpComponent {
  // Sample data - in real app this would come from a service
  helpPosts = signal<HelpPost[]>([
    {
      id: '1',
      ngoName: 'Red Crescent Society',
      location: 'Kyiv, Ukraine',
      helpType: 'Shelter',
      description: 'Temporary housing for displaced families',
      availableFrom: new Date('2023-12-01'),
      availableTo: new Date('2023-12-31'),
      initialQuantity: 50,
      remainingQuantity: 12,
      postedDate: new Date('2023-11-25'),
      isVerified: true
    },
    {
      id: '2',
      ngoName: 'World Food Programme',
      location: 'Lviv, Ukraine',
      helpType: 'Food',
      description: 'Daily meal packages for individuals and families',
      availableFrom: new Date('2023-12-01'),
      postedDate: new Date('2023-11-20'),
      isVerified: true
    },
  ]);

  // Modal state
  showAvailModal = signal(false);
  currentPostId = signal<string | null>(null);

  // Form model
  availForm = {
    name: '',
    contact: '',
    location: '',
    message: ''
  };

  // Filters
  selectedLocation = signal<string>('All');
  selectedHelpType = signal<string>('All');
  searchQuery = signal<string>('');
  visibleCount = signal<number>(5);

  // Get unique locations for filter dropdown
  locations = computed(() => {
    const allLocations = this.helpPosts().map(post => post.location);
    return ['All', ...new Set(allLocations)];
  });

  // Filtered posts
  filteredPosts = computed(() => {
    return this.helpPosts()
      .filter(post =>
        (this.selectedLocation() === 'All' || post.location === this.selectedLocation()) &&
        (this.selectedHelpType() === 'All' || post.helpType === this.selectedHelpType()) &&
        (post.description.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
         post.ngoName.toLowerCase().includes(this.searchQuery().toLowerCase()))
      )
      .slice(0, this.visibleCount());
  });

  // Check if post is expiring soon (within 3 days)
  isExpiringSoon(post: HelpPost): boolean {
    if (!post.availableTo) return false;
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    return post.availableTo <= threeDaysFromNow;
  }

  loadMore() {
    this.visibleCount.update(count => count + 5);
  }

  openAvailModal(postId: string) {
    this.currentPostId.set(postId);
    this.showAvailModal.set(true);
    // In a real app, we might try to auto-detect location here
  }

  closeAvailModal() {
    this.showAvailModal.set(false);
    this.currentPostId.set(null);
    this.resetForm();
  }

  resetForm() {
    this.availForm = {
      name: '',
      contact: '',
      location: '',
      message: ''
    };
  }

  submitAvailForm() {
    // In a real app, this would send data to backend
    const formData = {
      ...this.availForm,
      postId: this.currentPostId(),
      submittedAt: new Date()
    };

    console.log('Form submitted:', formData);
    alert('Thank you for your interest. The NGO will contact you if needed.');

    // Close modal and reset form
    this.closeAvailModal();

    // In a real app, we would also decrement the remaining quantity
    // this.decrementPostQuantity(this.currentPostId()!);
  }

  // Helper function to decrement post quantity (would be used in real implementation)
  private decrementPostQuantity(postId: string) {
    this.helpPosts.update(posts =>
      posts.map(post =>
        post.id === postId && post.remainingQuantity !== undefined
          ? {...post, remainingQuantity: post.remainingQuantity - 1}
          : post
      )
    );
  }
}
