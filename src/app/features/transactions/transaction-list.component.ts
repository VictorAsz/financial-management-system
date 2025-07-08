import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/interfaces/transaction.interface';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  imports: [CommonModule],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;

  constructor(private transactionService: TransactionService) {}

  async ngOnInit() {
    this.transactions = await this.transactionService.getTransactions();
    this.loading = false;
  }
}
