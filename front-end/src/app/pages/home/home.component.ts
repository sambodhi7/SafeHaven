import { Component } from '@angular/core';
import { NgxAuroraComponent } from '@omnedia/ngx-aurora';
import {NgxTypewriterComponent} from '@omnedia/ngx-typewriter'
@Component({
  selector: 'app-home',
  imports: [NgxAuroraComponent,NgxTypewriterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
