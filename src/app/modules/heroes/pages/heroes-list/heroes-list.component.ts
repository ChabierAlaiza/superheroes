import { ChangeDetectorRef, Component } from '@angular/core';
import { Hero } from '../../interfaces/Hero';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeroesService } from '../../services/heroes.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { normalizeText } from '../../../../shared/normalizeText';
import { HighlightPipe } from '../../../shared/pipes/highlight.pipe';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    CapitalizePipe,
    HighlightPipe,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    TranslateModule,
  ],

  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent {
  public heroes: Hero[] = [];
  public filters: any = {};
  public totalRecords: number = 0;
  public loading: boolean = true;
  public lastGridEvent!: TableLazyLoadEvent;

  constructor(
    private heroesService: HeroesService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.lastGridEvent = {
      first: Number(localStorage.getItem('heroesListLastFirst')) || 0,
      rows: 10,
      sortField: 'id',
      sortOrder: -1,
      filters: {},
      globalFilter: '',
    };
  }

  ngOnDestroy() {
    if (this.lastGridEvent) {
      localStorage.setItem(
        'heroesListLastGridEvent',
        JSON.stringify(this.lastGridEvent)
      );
    }
  }

  public loadData(event: TableLazyLoadEvent): void {
    this.lastGridEvent = event;
    this.loading = true;
    this.heroesService.getAll().subscribe({
      next: (data: any) => {
        this.heroes = data;
        if (this.filters.name) {
          this.heroes = this.filterByName(this.heroes);
        }
        this.totalRecords = this.heroes.length;
        this.heroes = this.heroes.slice(event.first);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los héroes',
        });
      },
      complete: () => {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  public edit(id: number): void {
    this.router.navigate(['heroes', id]);
  }

  public delete(hero: Hero): void {
    this.confirmationService.confirm({
      message: `¿Seguro que quieres eliminar el héroe: ${hero.name}?`,
      header: 'Confirmar borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-blue-500 btn-custom mx-1',
      rejectButtonStyleClass: 'bg-red-500 btn-custom mx-1',

      accept: () => {
        hero.deleted = 'true';
        this.heroesService.update(hero).subscribe({
          next: (data: Hero) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Completado',
              detail: 'Borrado con éxito',
            });
            this.loadData(this.lastGridEvent);
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo borrar el héroe',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: 'Borrado cancelado',
        });
      },
    });
  }


  public clearFilters(): void {
    this.filters = {};

    this.loadData(this.lastGridEvent);
  }

  filterByName(heroes: Hero[]): Hero[] {
    return heroes.filter((hero: Hero) => {
      const heroNameNormalized = normalizeText(hero.name);
      const filterNormalized = normalizeText(this.filters.name);

      return heroNameNormalized.includes(filterNormalized);
    });
  }
}
