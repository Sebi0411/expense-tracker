import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: '/expenses/Monday', pathMatch: 'full' },
  {
    path: 'expenses/:navId',
    //component: ExpensesComponent,
    loadComponent: () => import('./expenses/expenses.component').then(mod => mod.ExpensesComponent),
  },
  {
    path: 'Summary',
    // component: SummaryComponent,
    loadComponent: () => import('./summary/summary.component').then(mod => mod.SummaryComponent)
  },
];
