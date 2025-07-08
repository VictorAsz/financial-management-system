export interface Account {
  id: number;
  name: string;
  type: 'wallet' | 'bank' | 'credit_card';
}
