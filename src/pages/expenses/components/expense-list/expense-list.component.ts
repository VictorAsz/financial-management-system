import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseRecord } from '../../models/expense-record';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'expense-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  public list: ExpenseRecord[] = [];
  public filteredList: ExpenseRecord[] = [];
  public searchTerm: string = '';
  public isOpen: boolean = false; // Variável para controlar o acordeão

  // Filter Variables
  public selectedProduct: string = '';
  public selectedCategory: string = '';
  public selectedUser: string = '';
  public minValue: number | null = null;
  public maxValue: number | null = null;
  public startDate: string | null = null;
  public endDate: string | null = null;
  public paymentStartDate: string | null = null;
  public paymentEndDate: string | null = null;
  public selectedPaymentType: string = '';
  public selectedStatus: string = '';



  constructor(
    private _expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.getExpenses();
  }

  public getExpenses() {
    this._expensesService.getExpenses().subscribe({
      next: response => {
        this.list = response.records;
        this.filteredList = response.records; // Inicializa a lista filtrada
      },
      error: () => {
        console.log("erro GetExpense");
      }
    });
  }

  public search() {
    if (this.searchTerm) {
      this.filteredList = this.list.filter(record => 
        record.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.user.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredList = this.list; // Se não houver termo de pesquisa, exibe todos os registros
    }
  }

  public clear() {
    this.searchTerm = ''; // Limpa o termo de pesquisa
    this.filteredList = this.list; // Restaura a lista filtrada
  }
}
