import { Routes } from '@angular/router';
import { Login } from './core/login/login';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: Login },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login').then(m => m.Login)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'servey',
    canActivate: [authGuard],
    loadComponent: () => import('./features/servey-builder/servey-builder').then(m => m.ServeyBuilder)
  }
];
