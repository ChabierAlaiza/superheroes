import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HeroesService } from '../../../heroes/services/heroes.service';
import { Hero } from '../../../heroes/interfaces/Hero';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-last-heroes-section',
  standalone: true,
  imports: [HeroCardComponent, RouterModule, ButtonModule, TranslateModule],
  templateUrl: './last-heroes-section.component.html',
  styleUrl: './last-heroes-section.component.css'
})
export class LastHeroesSectionComponent {
  @Input() numberOfHeroes: number | undefined;
  public heroes: Hero[] = [];

  constructor(
    private heroesService: HeroesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(): void {
    this.heroesService.getAll().subscribe({
      next: (data: any) => {
        this.heroes = data;
        this.heroes = this.heroes.slice(this.heroes.length - this.numberOfHeroes!);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public view(id: any): void {
    this.router.navigate(['/heroes/', id]);
  }

  public viewAll(): void {
    this.router.navigate(['/heroes']);
  }

}
