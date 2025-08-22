import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/interfaces/transaction.interface';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './form/transaction-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;

  displayedColumns: string[] = [
    'title',
    'total_amount',
    'type',
    'category',
    'account',
    'transaction_date',
    'installment',
    'actions',
  ];

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.loadTransactions();
    this.loading = false;
  }

  async loadTransactions() {
    this.transactions = await this.transactionService.getTransactions();
  }
  editTransaction(_t28: Transaction) {
    throw new Error('Method not implemented.');
  }
  createTransaction() {
    this.dialog
      .open(TransactionFormComponent, {
        width: '1000px',
        data: null,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadTransactions();
      });
  }
  viewTransaction(_t4: Transaction) {
    throw new Error('Method not implemented.');
  }
  async deleteTransaction(transaction: Transaction) {
    if (!confirm('Deseja realmente excluir esta transação?')) return;
    await this.transactionService.deleteTransaction(transaction.id);
    await this.loadTransactions();
  }
}
