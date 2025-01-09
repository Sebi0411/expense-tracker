import { Routes } from '@angular/router';
import { ExpenseListComponent } from './expenses/expense/expense.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'mon', pathMatch: 'full' },
  { path: ':day', component: ExpenseListComponent },
  { path: 'summary', component: SummaryComponent }
];