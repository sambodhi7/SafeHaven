import { Component, signal } from '@angular/core';
import { NgxFlickeringGridComponent } from '@omnedia/ngx-flickering-grid';
import { GooglemapComponent } from '../../components/googlemap/googlemap.component';
import {NgxNeonUnderlineComponent} from "@omnedia/ngx-neon-underline"

@Component({
  selector: 'app-frontline-lens',
  imports: [NgxFlickeringGridComponent, GooglemapComponent ],
  templateUrl: './frontline-lens.component.html',
  styleUrl: './frontline-lens.component.css'
})
export class FrontlineLensComponent {
  frontLines = signal([])
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    fetch("http://127.0.0.1:5000/api/get/frontlines").then(res=>res.json()).then(res=>this.frontLines.set(res))
  }
}
