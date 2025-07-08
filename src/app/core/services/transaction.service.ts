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
     .select('*')
     .order('transaction_date', { ascending: false });


    if (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
    return data || [];
  }
}
