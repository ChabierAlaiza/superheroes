import { Hero } from '../interfaces/Hero';

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { environment } from '../../../../environments/environment';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all heroes from the API via GET', () => {
    const mockHeroes = [
      {
        id: 1,
        name: 'Superman',
        bio: 'bio',
        image: 'image',
        firstIntroduction: 'firstIntroduction',
        publisher: 'DC',
        deleted: 'false',
      },
      {
        id: 2,
        name: 'Spider-Man',
        bio: 'bio',
        image: 'image',
        firstIntroduction: 'firstIntroduction',
        publisher: 'DC',
        deleted: 'false',
      },
    ];
    service.getAll().subscribe((heroes) => {
      expect(heroes).toEqual(mockHeroes);
    });
    const req = httpMock.expectOne(environment.baseUrl + '?deleted=false');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should retrieve a hero by ID from the API via GET', () => {
    const mockHero: Hero = {
      id: 1,
      name: 'Spider-Man',
      bio: 'bio',
      image: 'image',
      firstIntroduction: 'firstIntroduction',
      publisher: 'publisher',
      deleted: 'false',
    };
    service.getHeroById(1).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should save a hero to the API via POST', () => {
    const newHero: Omit<Hero, 'id'> = {
      name: 'Spider-Man',
      bio: 'bio',
      image: 'image',
      firstIntroduction: 'firstIntroduction',
      publisher: 'publisher',
      deleted: 'false',
    };
    service.save(newHero).subscribe((hero) => {
      expect(hero.name).toEqual(newHero.name);
    });
    const req = httpMock.expectOne(environment.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newHero, id: 1 });
  });

  it('should update a hero on the API via PUT', () => {
    const updatedHero: Hero = {
      id: 1,
      name: 'Spider-Man',
      bio: 'bio',
      image: 'image',
      firstIntroduction: 'firstIntroduction',
      publisher: 'Marvel',
      deleted: 'false',
    };
    service.update(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });
});
