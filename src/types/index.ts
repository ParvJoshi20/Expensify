export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  type: 'expense' | 'income';
}

export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Groceries',
  'Other'
] as const;

export type Category = typeof CATEGORIES[number];