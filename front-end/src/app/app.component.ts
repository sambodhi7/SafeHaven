import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "../app/components/navbar/navbar.component";
import {FooterComponent} from "../app/components/footer/footer.component";
import {NgxBackgroundBeamsComponent} from "@omnedia/ngx-background-beams"
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxBackgroundBeamsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
