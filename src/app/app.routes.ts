import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'heroes',
    loadComponent: () =>
      import('./modules/heroes/pages/heroes-list/heroes-list.component').then(
        (m) => m.HeroesListComponent
      ),
  },
  {
    path: 'heroes/:id',
    loadComponent: () =>
      import(
        './modules/heroes/pages/heroes-detail/heroes-detail.component'
      ).then((m) => m.HeroesDetailComponent),
  },
  { path: '**', redirectTo: '/home' },
];
