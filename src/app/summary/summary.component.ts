import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpensesService } from '../expenses/expenses.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  expensesByDay: { [key: string]: { category: string; amount: number }[] } = {};
  days: string[] = [];
  weeklyTotal: number = 0;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.expensesByDay = this.expensesService.getExpensesByDay();
    this.days = Object.keys(this.expensesByDay);
    this.weeklyTotal = this.expensesService.getTotalAmount();
  }
}
