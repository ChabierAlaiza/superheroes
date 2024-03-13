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
  public hero: Hero = {
    id: 0,
    name: '',
    bio: '',
    image: '',
    first_introduction: '',
    publisher: '',
    deleted: 'false',
  };
  public heroForm!: FormGroup;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.heroForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      first_introduction: new FormControl('', [Validators.required]),
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
            name: this.hero.name,
            bio: this.hero.bio,
            image: this.hero.image,
            first_introduction: this.hero.first_introduction,
            publisher: this.hero.publisher,
          });
        }
      },
      error: (error: any) => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el héroe',
          });
        }, 100);
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
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el héroe',
        });
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
}