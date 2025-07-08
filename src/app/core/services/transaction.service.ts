import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Transaction } from '../interfaces/transaction.interface';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://yuzqcuzbkkydwbnekfos.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1enFjdXpia2t5ZHdibmVrZm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjYyNTcsImV4cCI6MjA2NjM0MjI1N30.xYdyj6AYAYSri9pLXStDvunaWuVW1dFDTdVfO7ymzoY'
    );
  }

  async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await this.supabase
      .from('transactions')
      .select(
        `
       *,
       account:accounts!transactions_account_id_fkey (id, name, type),
       destination:accounts!transactions_destination_account_id_fkey (id, name, type),
       category:categories (id, name, color)
     `
      )
      .order('transaction_date', { ascending: false });

    if (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }

    return data || [];
  }
}
