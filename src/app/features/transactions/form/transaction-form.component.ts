import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface Category {
  id: number;
  name: string;
  type: string;
}

interface Account {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class TransactionFormComponent implements OnInit {
  @Input() transaction?: Transaction;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  categories: Category[] = [];
  accounts: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      title: [this.transaction?.title || '', Validators.required],
      total_amount: [
        this.transaction?.total_amount || 0,
        [Validators.required, Validators.min(0.01)],
      ],
      type: [this.transaction?.type || 'expense', Validators.required],
      category_id: [this.transaction?.category_id || null],
      account_id: [this.transaction?.account_id || null],
      transaction_date: [
        this.transaction?.transaction_date ||
          new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      is_installment: [this.transaction?.is_installment || false],
      installment_count: [this.transaction?.installment_count || 1],
      payment_method: [this.transaction?.payment_method || 'pix'],
    });

    await this.loadCategories();
    await this.loadAccounts();
  }

  private async loadCategories() {
    try {
      this.categories = await this.transactionService.getCategories();
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  private async loadAccounts() {
    try {
      this.accounts = await this.transactionService.getAccounts();
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    try {
      if (this.transaction) {
        await this.transactionService.updateTransaction(
          this.transaction.id,
          this.form.value
        );
      } else {
        await this.transactionService.createTransaction(this.form.value);
      }
      this.saved.emit();
    } finally {
      this.loading = false;
    }
  }
}
