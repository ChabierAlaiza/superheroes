import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslatePipe],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title and subtitle with translations', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const title = bannerElement.querySelector('h1')!;
    const subtitle = bannerElement.querySelector('span')!;

    expect(title.textContent).toContain('home.title');
    expect(subtitle.textContent).toContain('home.subtitle');
  });
});
