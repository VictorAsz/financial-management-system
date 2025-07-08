export interface Transaction {
 id: number;
 user_id: number;
 title: string;
 total_amount: number;
 is_installment: boolean;
 installment_count: number;
 payment_method: string;
 account_id: number | null;
 destination_account_id: number | null;
 category_id: number | null;
 type: string;
 transaction_date: string; // ISO date string
 created_at: string; // ISO date string
}
