export interface Expense {
  id: string;
  category: string;
  amount: number;
  day: string;
}

export interface NewExpenseData {
  category: string;
  amount: number;
  day: string;
}
