import { Component, signal } from '@angular/core';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import { GooglemapComponent } from '../../components/googlemap/googlemap.component';
import {NgxNeonUnderlineComponent} from "@omnedia/ngx-neon-underline"
import { AddEventListenerOptions } from 'rxjs/internal/observable/fromEvent';
import { AddEchoComponent } from '../../add-echo/add-echo.component';
import { AddFrontLineLensFormComponent } from "../../components/add-front-line-lens-form/add-front-line-lens-form.component";

@Component({
  selector: 'app-frontline-lens',
  imports: [NgxFlickeringGridComponent, GooglemapComponent, AddEchoComponent, AddFrontLineLensFormComponent],
  templateUrl: './frontline-lens.component.html',
  styleUrl: './frontline-lens.component.css'
})
export class FrontlineLensComponent {
  frontLines = signal([])
  showModal = signal(false);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.load()    
  }
  load(){
    fetch("http://127.0.0.1:5000/api/get/frontlines").then(res=>res.json()).then(res=>this.frontLines.set(res))

  }
  openModal() {
    this.showModal.set(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
  closeModal() {
    this.showModal.set(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  }

}
