import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
  {
    path: 'expenses/:navId',
    loadComponent: () => import('./expenses/expenses.component').then(mod => mod.ExpensesComponent),
  },
  {
    path: 'Summary',
    loadComponent: () => import('./summary/summary.component').then(mod => mod.SummaryComponent)
  },
];
