import { Routes } from '@angular/router';
import { ExpenseComponent } from './expenses/expense/expense.component';
import { SummaryComponent } from './summary/summary.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
  {
      path: 'expenses/:navId',
      component: ExpensesComponent,
  },
  {
      path: 'Summary',
      component: SummaryComponent
  },
];