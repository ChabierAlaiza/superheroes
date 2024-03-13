import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesDetailComponent } from './heroes-detail.component';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeroesDetailComponent Edit Heroe', () => {
  let component: HeroesDetailComponent;
  let fixture: ComponentFixture<HeroesDetailComponent>;
  let heroesService: HeroesService;

  beforeEach(() => {
    const paramsSubject = new BehaviorSubject({
      id: 1,
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: HeroesService,
          useValue: {
            getAll: () => of([{ id: 1 }]),
            getHeroById: () => of({ id: 1, name: 'SpiderMan' }),
          },
        },

        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
          },
        },
        ConfirmationService,
        MessageService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    heroesService = TestBed.get(HeroesService);
  });

  it('should create component', () => {
    expect(component.hero.id).toEqual(1);
    expect(component).toBeTruthy();
  });

  it('should load hero with id equal to 1', () => {
    spyOn(heroesService, 'getHeroById').and.callThrough();
    component.ngOnInit();

    expect(heroesService.getHeroById).toHaveBeenCalledWith(1);
    const inputName = fixture.debugElement.query(By.css('#name'));
    const inputValue = inputName.nativeElement.value;

    expect(inputValue).toEqual('SpiderMan');
  });
});

describe('HeroesDetailComponent Create Heroe', () => {
  let component: HeroesDetailComponent;
  let fixture: ComponentFixture<HeroesDetailComponent>;

  beforeEach(() => {
    const paramsSubject = new BehaviorSubject({
      id: 0,
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject,
          },
        },
        ConfirmationService,
        MessageService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize heroForm with empty values', () => {
    expect(component.heroForm.value).toEqual({
      name: '',
      bio: '',
      first_introduction: '',
      image: '',
      publisher: '',
    });
  });
});
