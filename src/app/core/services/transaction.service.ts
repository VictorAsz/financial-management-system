import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Transaction } from '../interfaces/transaction.interface';
import { SupabaseService } from './supabase.service';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseService().client;
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
