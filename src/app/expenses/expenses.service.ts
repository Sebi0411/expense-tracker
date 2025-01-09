import { Injectable } from '@angular/core';
import { Expense, NewExpenseData } from './expense/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expenses = [
    {
      id: 'e1',
      category: 'Food',
      amount: 100,
      day: 'Monday',
    },
    {
      id: 'e2',
      category: 'Transportation',
      amount: 50,
      day: 'Tuesday',
    },
    {
      id: 'e3',
      category: 'Entertainment',
      amount: 200,
      day: 'Monday',
    },
  ];
  constructor() {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      this.expenses = JSON.parse(expenses);
    }
  }

  getExpenses() {
    return this.expenses;
  }

  getExpense(Id: string) {
    const defaultExpense: Expense = { id: '0', category: 'Unknown', amount: 0, day: 'Unknown' };
    return this.expenses.find((task) => task.id === Id) || defaultExpense;
  }

  getExpensesByDay(): { [key: string]: Expense[] } {
    return this.expenses.reduce((acc, expense) => {
      if (!acc[expense.day]) {
        acc[expense.day] = [];
      }
      acc[expense.day].push(expense);
      return acc;
    }, {} as { [key: string]: Expense[] });
  }

  getTotalAmount(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalForDay(day: string): number {
    return this.expenses
      .filter(expense => expense.day === day)
      .reduce((total, expense) => total + expense.amount, 0);
  }

  addExpense(expenseData: NewExpenseData) {
    this.expenses.push({
      id: Math.random().toString(),
      ...expenseData,
    });
    this.saveExpenses();
  }

  updateExpense(id: string, updatedData: Partial<{ category: string; amount: number }>) {
    const expense = this.expenses.find(e => e.id === id);
    if (expense) {
      Object.assign(expense, updatedData);
    }
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  removeExpense(Id: string) {
    this.expenses = this.expenses.filter((task) => task.id !== Id);
    this.saveExpenses();
  }

  private saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}
