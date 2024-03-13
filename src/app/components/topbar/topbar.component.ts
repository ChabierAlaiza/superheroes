import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MenubarModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService
      .get('topbar')
      .subscribe((res: { home: string; heroes: string }) => {
        this.items[0].label = res.home;
        this.items[1].label = res.heroes;
      });
  }

  public items = [
    {
      label: '',
      icon: 'pi pi-fw pi-home',
      routerLink: '/',
    },
    {
      label: '',
      icon: 'pi pi-fw pi-prime',
      routerLink: '/heroes',
    },
  ];

  public changeLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.translateService
      .get('topbar')
      .subscribe((res: { home: string; heroes: string }) => {
        this.items[0].label = res.home;
        this.items[1].label = res.heroes;
      });
  }
}
