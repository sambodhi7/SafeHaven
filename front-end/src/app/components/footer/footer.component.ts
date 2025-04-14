import { Component } from '@angular/core';
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';
import {NgxRetroGridComponent} from "@omnedia/ngx-retro-grid"
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgxGridpatternComponent, NgxRetroGridComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
