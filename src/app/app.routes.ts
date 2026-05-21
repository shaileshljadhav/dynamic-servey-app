import { Routes } from '@angular/router';
import { Login } from './core/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
      path: 'dashboard',
      loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
      path: 'servey',
      loadComponent: () => import('./features/servey-builder/servey-builder').then(m => m.ServeyBuilder)
    }
];
