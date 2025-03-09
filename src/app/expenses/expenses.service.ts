import { Injectable } from '@angular/core';
import { Expense, NewExpenseData } from '../shared/models/expense.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expensesSubject = new BehaviorSubject<any[]>([]);
  expenses$ = this.expensesSubject.asObservable();
  private expenses = [
    {
      id: 'e1',
      userEmail: 'admin@admin.com',
      category: 'Food',
      amount: 100,
      day: 'Monday',
    },
    {
      id: 'e2',
      userEmail: 'admin@admin.com',
      category: 'Transportation',
      amount: 50,
      day: 'Tuesday',
    },
    {
      id: 'e3',
      userEmail: 'admin2@admin.com',
      category: 'Entertainment',
      amount: 200,
      day: 'Monday',
    },
  ];
  constructor(private authService: AuthService) {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      this.expenses = JSON.parse(expenses);
    }
  }

  getExpensesByUser() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return [];
    return this.expenses.filter(
      (expense) => expense.userEmail === currentUser.email
    );
  }

  getExpense(Id: string) {
    const defaultExpense: Expense = {
      id: '0',
      userEmail: 'Unknown',
      category: 'Unknown',
      amount: 0,
      day: 'Unknown',
    };
    return this.expenses.find((task) => task.id === Id) || defaultExpense;
  }

  getExpensesByDay(): { [key: string]: Expense[] } {
    const userExpenses = this.getExpensesByUser();
    return userExpenses.reduce((acc, expense) => {
      if (!acc[expense.day]) {
        acc[expense.day] = [];
      }
      acc[expense.day].push(expense);
      return acc;
    }, {} as { [key: string]: Expense[] });
  }

  getTotalAmount(): number {
    const userExpenses = this.getExpensesByUser();
    return userExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalForDay(day: string): number {
    const userExpenses = this.getExpensesByUser();
    return userExpenses
      .filter((expense) => expense.day === day)
      .reduce((total, expense) => total + expense.amount, 0);
  }

  addExpense(expenseData: NewExpenseData) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.expenses.push({
      id: Math.random().toString(),
      userEmail: currentUser.email,
      ...expenseData,
    });
    this.expensesSubject.next(this.expenses);
    this.saveExpenses();
  }

  updateExpense(
    id: string,
    updatedData: Partial<{ category: string; amount: number }>
  ) {
    const expense = this.expenses.find((e) => e.id === id);
    if (expense) {
      Object.assign(expense, updatedData);
    }
    this.expensesSubject.next(this.expenses);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  removeExpense(Id: string) {
    this.expenses = this.expenses.filter((task) => task.id !== Id);
    this.saveExpenses();
    this.expensesSubject.next(this.expenses);
  }

  private saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }
}
