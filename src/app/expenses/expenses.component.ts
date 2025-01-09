import { Component, Input } from '@angular/core';
import { ExpenseComponent } from "./expense/expense.component";
import { AddExpenseComponent } from "./add-expenses/add-expense.component";
import { ExpensesService } from './expenses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseComponent, AddExpenseComponent, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {

  @Input({required: true}) day!: string;

  isAddingExpense = false;
  isEditingExpense = false;
  selectedExpenseId: string = '';
  dayTotal: number = 0;

  constructor(private expensesService: ExpensesService) {}

  ngOnChanges() {
    this.dayTotal = this.expensesService.getTotalForDay(this.day);
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
    return this.expenses.find((expense) => expense.id === this.selectedExpenseId);
  }

  onSelectExpense(id: string) {
    this.selectedExpenseId = id;
    this.isEditingExpense = true;
  }
}
