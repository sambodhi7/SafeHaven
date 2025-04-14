import { Component, input, Signal, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl,  } from '@angular/platform-browser';

@Component({
  selector: 'app-googlemap',
  imports: [],
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.css'
})
export class GooglemapComponent {
  lat = input()
  lng = input()
  url : WritableSignal<SafeResourceUrl>= signal("")
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.url.set(this.sanitizer.bypassSecurityTrustResourceUrl(`http://maps.google.com/maps?q=${this.lat()},${this.lng()}&z=16&output=embed`));
  }

}
