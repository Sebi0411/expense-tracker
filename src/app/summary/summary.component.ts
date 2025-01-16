import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpensesService } from '../expenses/expenses.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  exportToExcel(): void {
    const data: { Day: string; Category: string; Amount: number }[] = [];
    for (const day of this.days) {
      this.expensesByDay[day].forEach(expense => {
        data.push({
          Day: day,
          Category: expense.category,
          Amount: expense.amount,
        });
      });
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Weekly Expenses');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Weekly_Expenses.xlsx');
  }
}
