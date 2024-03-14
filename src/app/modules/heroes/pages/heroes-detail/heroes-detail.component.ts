import { Component } from '@angular/core';
import { Hero } from '../../interfaces/Hero';
import { ButtonModule } from 'primeng/button';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-detail',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    TranslateModule,
  ],
  templateUrl: './heroes-detail.component.html',
  styleUrl: './heroes-detail.component.css',
})
export class HeroesDetailComponent {
  public hero!: Hero;
  public heroForm!: FormGroup;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.hero = {
      id: 0,
      name: '',
      bio: '',
      image: '',
      firstIntroduction: '',
      publisher: '',
      deleted: 'false',
    };
    this.heroForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      firstIntroduction: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      publisher: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadHero(params['id']);
    });
  }

  public loadHero(id: number): void {
    if (id == 0) return;
    this.heroesService.getHeroById(id).subscribe({
      next: (data: Hero | undefined) => {
        this.hero = data || this.hero;
        if (data) {
          this.heroForm.patchValue({
            ...data,
          });
        }
      },
      error: () => {
        this.router.navigate(['heroes']);
      },
    });
  }

  public save(): void {
    if (!this.heroForm.valid) {
      return;
    }
    this.hero = {
      ...this.hero,
      ...this.heroForm.value,
    };

    let service: Observable<Hero>;
    if (this.hero.id == 0) {
      const newHero = {
        ...this.hero,
        id: undefined
      };
      service = this.heroesService.save(newHero);
    } else {
      service = this.heroesService.update(this.hero);
    }
    service.subscribe({
      next: (data: Hero) => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Completado',
            detail: 'Guardado con éxito',
          });
        }, 100);
        this.router.navigate(['heroes']);
      },
      error: () => {
        this.router.navigate(['heroes']);
      },
    });
  }

  public cancel(): void {
    this.router.navigate(['heroes']);
  }

  public delete(): void {
    this.confirmationService.confirm({
      message: `¿Seguro que quieres eliminar el héroe: ${this.hero.name}?`,
      header: 'Confirmar borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-blue-500 btn-custom mx-1',
      rejectButtonStyleClass: 'bg-red-500 btn-custom mx-1',

      accept: () => {
        this.hero.deleted = 'true';
        this.heroesService.save(this.hero).subscribe({
          next: (data: Hero) => {
            setTimeout(() => {
              this.messageService.add({
                severity: 'info',
                summary: 'Completado',
                detail: 'Borrado con éxito',
              });
            }, 100);
            this.router.navigate(['heroes']);
          },
          error: () => {
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
}
