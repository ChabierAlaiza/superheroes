import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LastHeroesSectionComponent } from './components/last-heroes-section/last-heroes-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, LastHeroesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
