import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../../shared/models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: false }) expenseId?: string;
  @Input({ required: true }) currentDay!: string;
  enteredCategory = '';
  enteredAmount = 0;
  expense!: Expense;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    if (this.expenseId !== undefined) {
      this.expense = this.expensesService.getExpense(this.expenseId);
      this.enteredCategory = this.expense.category;
      this.enteredAmount = this.expense.amount;
    }
  }

  onCancel() {
    this.close.emit();
  }

  onSave() {
    if (this.expenseId !== undefined) {
      this.expensesService.updateExpense(this.expenseId, {
        category: this.enteredCategory,
        amount: this.enteredAmount,
      });
    } else
      this.expensesService.addExpense({
        category: this.enteredCategory,
        amount: this.enteredAmount,
        day: this.currentDay,
      });

    this.enteredCategory = '';
    this.enteredAmount = 0;
    this.close.emit();
  }
}
