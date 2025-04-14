import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxDotpatternComponent } from '@omnedia/ngx-dotpattern';

interface Debunk {
  id: number;
  title: string;
  fakeArticleUrl: string;
  reasons: string;
  correctInfo: string;
  sources: string;
  notes?: string;
  date: Date;
}

@Component({
  selector: 'app-clear-cut',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDotpatternComponent],
  templateUrl: './clear-cut.component.html',
  styleUrls: ['./clear-cut.component.css']
})
export class ClearCutComponent {
  showModal = signal(false);
  isLoading = signal(false);
  debunks = signal<Debunk[]>([]);
  visibleDebunks = signal<Debunk[]>([]);
  batchSize = 5;
  currentBatch = 0;

  newDebunk = signal<Partial<Debunk>>({
    title: '',
    fakeArticleUrl: '',
    reasons: '',
    correctInfo: '',
    sources: '',
    notes: ''
  });

  constructor() {
    // Initialize with mock data
    this.generateMockDebunks(10);
    this.loadMoreDebunks();

    // Set up scroll listener for infinite loading
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  generateMockDebunks(count: number) {
    const mockDebunks: Debunk[] = [];
    for (let i = 1; i <= count; i++) {
      mockDebunks.push({
        id: i,
        title: `Misleading article about ${i % 2 === 0 ? 'casualty numbers' : 'military movements'}`,
        fakeArticleUrl: `https://fakenews.example.com/article-${i}`,
        reasons: `Reason 1: No credible sources cited\nReason 2: Photos are from different conflict\nReason 3: Numbers inflated by ${i * 50}%`,
        correctInfo: `Official reports confirm the actual situation is different. Verified sources show...`,
        sources: `https://trusted-source.com/real-info\nhttps://government.gov/updates\nhttps://un.org/conflict-data`,
        notes: i % 3 === 0 ? 'This has been circulating on social media' : undefined,
        date: new Date(Date.now() - i * 86400000) // Older dates for older items
      });
    }
    this.debunks.set(mockDebunks);
  }

  loadMoreDebunks() {
    this.isLoading.set(true);
    setTimeout(() => {
      const start = this.currentBatch * this.batchSize;
      const end = start + this.batchSize;
      const newDebunks = this.debunks().slice(start, end);

      this.visibleDebunks.update(debunks => [...debunks, ...newDebunks]);
      this.currentBatch++;
      this.isLoading.set(false);
    }, 500); // Simulate network delay
  }

  handleScroll() {
    if (this.isLoading()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight - 300) {
      this.loadMoreDebunks();
    }
  }

  openModal() {
    this.showModal.set(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.showModal.set(false);
    document.body.style.overflow = ''; // Re-enable scrolling
    this.resetForm();
  }

  submitDebunk() {
    const debunk: Debunk = {
      id: Date.now(),
      title: this.newDebunk().title || 'Untitled Debunk',
      fakeArticleUrl: this.newDebunk().fakeArticleUrl || '',
      reasons: this.newDebunk().reasons || '',
      correctInfo: this.newDebunk().correctInfo || '',
      sources: this.newDebunk().sources || '',
      notes: this.newDebunk().notes,
      date: new Date()
    };

    // Add to beginning of array
    this.debunks.update(debunks => [debunk, ...debunks]);
    this.visibleDebunks.update(debunks => [debunk, ...debunks.slice(0, -1)]);

    this.closeModal();

    // Show confirmation
    alert('Thank you for your submission! Your debunk has been added.');
  }

  resetForm() {
    this.newDebunk.set({
      title: '',
      fakeArticleUrl: '',
      reasons: '',
      correctInfo: '',
      sources: '',
      notes: ''
    });
  }

  reportDebunk(id: number) {
    console.log(`Reported debunk ${id}`);
    alert('Thank you for reporting. Our team will review this submission.');
  }

  copyDebunk(debunk: Debunk) {
    const text = `Debunk: ${debunk.title}\n\n` +
                 `Fake Article: ${debunk.fakeArticleUrl}\n\n` +
                 `Why It's Fake:\n${debunk.reasons}\n\n` +
                 `Correct Info:\n${debunk.correctInfo}\n\n` +
                 `Sources:\n${debunk.sources}`;

    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! Share this to help fight misinformation.');
  }

  getLines(text: string): string[] {
    return text.split('\n').filter(line => line.trim() !== '');
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }
}
