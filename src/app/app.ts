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
  constructor(private router: Router) {
    console.log(this.router.url);
  }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home'
      },
      {
        label: 'Servey Builder',
        icon: 'pi pi-star'
      },
      // {
      //     label: 'Contact',
      //     icon: 'pi pi-envelope'
      // }
    ];
  }
}
