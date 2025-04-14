import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent {
  @Input() icon!: string;
  @Input() value!: number;
  @Input() label!: string;
}
