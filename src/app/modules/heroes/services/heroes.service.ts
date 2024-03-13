import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../interfaces/Hero';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const params = { deleted: 'false' }; // mock api need it
    return this.http.get(`${this.baseUrl}`, { params });
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}${id}`);
  }

  save(hero: Omit<Hero, 'id'>): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(
      `${this.baseUrl}${hero.id}`,
      hero
    );
  }
}
