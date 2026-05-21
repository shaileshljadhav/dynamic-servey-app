import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('dynamic-servey-app');
  showHeader = false;
  constructor(private router: Router) {
    this.router.events.subscribe((url: any) => {
      if (url.url !== undefined && url.url !== null) {
        const browserUrl = url.url.split('?');
        if (browserUrl[0] === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        // icon: 'pi pi-home',
        routerLink: ['/dashboard'] 
      },
      {
        label: 'Servey Builder',
        routerLink: ['/servey'] 
      },
      // {
      //     label: 'Contact',
      //     icon: 'pi pi-envelope'
      // }
    ];
  }
}
