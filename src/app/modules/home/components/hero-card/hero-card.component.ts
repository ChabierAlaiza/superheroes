import { Component, Input } from '@angular/core';
import { Hero } from '../../../heroes/interfaces/Hero';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {
  @Input() hero: Hero | undefined;

  constructor() { }

  ngOnInit() {
  }

}
