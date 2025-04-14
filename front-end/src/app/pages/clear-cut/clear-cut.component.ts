import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxDotpatternComponent } from '@omnedia/ngx-dotpattern';
import { NgxSpotlightComponent } from '@omnedia/ngx-spotlight';
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';
import {NgxBackgroundBeamsComponent} from "@omnedia/ngx-background-beams"

interface Debunk {
  _id:string;
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
  imports: [CommonModule, FormsModule,NgxSpotlightComponent,NgxBackgroundBeamsComponent, NgxDotpatternComponent, NgxGridpatternComponent],
  templateUrl: './clear-cut.component.html',
  styleUrls: ['./clear-cut.component.css']
})
export class ClearCutComponent {
  showModal = signal(false);
  isLoading = signal(false);
  debunks = signal<Debunk[]>([]);
  visibleDebunks = signal<Debunk[]>([]);
 
  offset = signal(0);


  newDebunk = signal<Partial<Debunk>>({
    title: '',
    fakeArticleUrl: '',
    reasons: '',
    correctInfo: '',
    sources: '',
    notes: '',
    _id : ''
  });

  constructor() {
    // Initialize with mock data
   
    this.loadMoreDebunks();

    // Set up scroll listener for infinite loading
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  ngOnInit(): void {
    fetch("http://127.0.0.1:5000/api/debunks",{
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify({offset: this.offset()} )
      }).then(res=>res.json()).then(res=>{
        if(res['success']){
          console.log(res['debunks'])
          this.debunks.set(res['debunks'])
        }
      })
      
    
  }

  generateMockDebunks(count: number) {
    const mockDebunks: Debunk[] = [];
  
  }

  loadMoreDebunks() {
    // this.isLoading.set(true);
    // fetch("http://127.0.0.1:5000/api/debunks",{
    //   method : "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({offset: this.offset()} )
    // }).then(res=>res.json()).then(res=>{
    //   if(res['success']){
    //     console.log(res['debunks'])
    //   }
    // })
    // this.isLoading.set(false);
   
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
    const newdebunk: Debunk = {
      _id : "",
      title: this.newDebunk().title || 'Untitled Debunk',
      fakeArticleUrl: this.newDebunk().fakeArticleUrl || '',
      reasons: this.newDebunk().reasons || '',
      correctInfo: this.newDebunk().correctInfo || '',
      sources: this.newDebunk().sources || '',
      notes: this.newDebunk().notes,
      date: new Date()
    };

    // Add to beginning of array
    fetch("http://127.0.0.1:5000/api/post/debunk",{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({debunk : newdebunk})
    }).then(res=>res.json()).then(res=>{
      if(res['success']){
        this.debunks.update(debunks=>[newdebunk, ...debunks])
        
        alert('Thank you for your submission! Your debunk has been added.');
        //this.closeModal();
      }else{
        alert("NOT DONE");
      }
    })
   
    
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

  reportDebunk(id: string) {
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
