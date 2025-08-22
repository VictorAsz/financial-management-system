import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private supabase: SupabaseService) {}

  // -------------------------
  // Helper para pegar tenant_id do usuário logado
  private async getTenantId(): Promise<number | null> {
    const user = await this.supabase.client.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) return null;

    const { data: tenant, error } = await this.supabase.client
      .from('tenant_members')
      .select('tenant_id')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar tenant:', error);
      return null;
    }
    return tenant?.tenant_id || null;
  }

  // -------------------------
  // GET: Todas as transações do tenant
  async getTransactions(): Promise<Transaction[]> {
    const tenantId = await this.getTenantId();
    if (!tenantId) return [];

    const { data, error } = await this.supabase.client
      .from('transactions')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }

    return data || [];
  }

  // GET: Uma transação por ID
  async getTransactionById(id: number): Promise<Transaction | null> {
    const tenantId = await this.getTenantId();
    if (!tenantId) return null;

    const { data, error } = await this.supabase.client
      .from('transactions')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar transação:', error);
      return null;
    }

    return data || null;
  }

  // -------------------------
  // CREATE: Cria uma transação
  async createTransaction(payload: Partial<Transaction>) {
    const tenantId = await this.getTenantId();
    const user = await this.supabase.client.auth.getUser();
    const userId = user.data.user?.id;

    if (!tenantId || !userId)
      throw new Error('Usuário ou tenant não encontrado');

    const fullPayload = {
      ...payload,
      user_id: userId,
      tenant_id: tenantId,
    };

    const { error } = await this.supabase.client
      .from('transactions')
      .insert([fullPayload]);

    if (error) throw error;
  }

  // -------------------------
  // UPDATE: Atualiza transação existente
  async updateTransaction(id: number, payload: Partial<Transaction>) {
    const tenantId = await this.getTenantId();
    if (!tenantId) throw new Error('Tenant não encontrado');

    const { error } = await this.supabase.client
      .from('transactions')
      .update(payload)
      .eq('id', id)
      .eq('tenant_id', tenantId); // garante que só atualiza transações do tenant

    if (error) throw error;
  }

  // -------------------------
  // DELETE: Remove transação
  async deleteTransaction(id: number) {
    const tenantId = await this.getTenantId();
    if (!tenantId) throw new Error('Tenant não encontrado');

    const { error } = await this.supabase.client
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;
  }

  async getCategories(): Promise<any> {
    const tenantId = await this.getTenantId();
    if (!tenantId) return [];

    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }

    return data || [];
  }

  async getAccounts(): Promise<any> {
    const tenantId = await this.getTenantId();
    if (!tenantId) return [];

    const { data, error } = await this.supabase.client
      .from('accounts')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) {
      console.error('Erro ao buscar contas:', error);
      return [];
    }

    return data || [];
  }
}
