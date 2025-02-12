import { Component, input, Input } from '@angular/core';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseComponent } from './add-expenses/add-expense.component';
import { ExpensesService } from './expenses.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseComponent, AddExpenseComponent, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  @Input({ required: true }) navId!: string;
  // navId = input.required<string>();

  isAddingExpense = false;
  isEditingExpense = false;
  selectedExpenseId: string = '';
  dayTotal: number = 0;

  private expensesSubscription!: Subscription;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesSubscription = this.expensesService.expenses$.subscribe(() => {
      this.updateDayTotal();
    });
  }

  ngOnChanges() {
    this.dayTotal = this.expensesService.getTotalForDay(this.navId);
  }

  ngOnDestroy() {
    if (this.expensesSubscription) {
      this.expensesSubscription.unsubscribe();
    }
  }

  get expenses() {
    return this.expensesService.getExpenses();
  }

  onStartAddExpense() {
    this.isAddingExpense = true;
  }

  onCloseAddExpense() {
    this.isAddingExpense = false;
  }

  onStartEditExpense() {
    this.isEditingExpense = true;
  }

  onCloseEditExpense() {
    this.isEditingExpense = false;
  }

  get selectedExpense() {
    return this.expenses.find(
      (expense) => expense.id === this.selectedExpenseId
    );
  }

  onSelectExpense(id: string) {
    this.selectedExpenseId = id;
    this.isEditingExpense = true;
  }

  private updateDayTotal() {
    this.dayTotal = this.expensesService.getTotalForDay(this.navId);
  }
}
