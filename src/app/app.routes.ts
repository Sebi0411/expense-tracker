import { Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: '/expenses/Monday', pathMatch: 'full' },
  {
    path: 'expenses/:navId',
    component: ExpensesComponent,
  },
  {
    path: 'Summary',
    component: SummaryComponent,
  },
];
