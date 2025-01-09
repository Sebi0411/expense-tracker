import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Expense } from './expense.model';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent {
  @Input({required: true}) expense!: Expense;
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>();
  day!: string;
  
  constructor(private expensesService: ExpensesService) {}

  onEditExpense() {
    this.select.emit(this.expense.id);
  }

  deleteExpense() {
    this.expensesService.removeExpense(this.expense.id);
  }

}
