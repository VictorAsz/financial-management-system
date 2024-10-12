import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseRecord } from '../../models/expense-record';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'expense-list',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule ],
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
    private _expensesService: ExpensesService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getExpenses();
  
  }

  public getExpenses() {
    this._expensesService.getExpenses().subscribe({
      next: response => {
        this.list = response;
        this.filteredList = response; // Inicializa a lista filtrada
        console.log(this.list)
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
      this.filteredList = this.list; 
    }
  }

  public clear() {
    this.searchTerm = ''; 
    this.filteredList = this.list; 
  }

  public navigateToEdit(id: string): void {
    this._router.navigate(['/expenses-add-form', id]); // Ajuste a rota conforme necessário
  }
}
