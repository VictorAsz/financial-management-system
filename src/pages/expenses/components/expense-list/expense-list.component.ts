import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseRecord } from '../../models/expense-record';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'expense-list',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, DeleteModalComponent, NgxPaginationModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  public list: ExpenseRecord[] = [];
  public filteredList: ExpenseRecord[] = [];
  public isOpen: boolean = false; // Variável para controlar o acordeão
  

  // Filter Variables
  public searchTerm: string = '';

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

 

  // Filters list variables:
  
  public CategoriesList: string[] = ['categoria1', 'categoria2'];
  public UsersList: string[] = ['Alice', 'Bob', 'Charlie'];
  public PaymentTypesList: string[] = [];
  public StatusesList: string[] = [];


  // modal Variables

  selectedExpenseId: string | null = null;
  isModalOpen = false; 

  //pagination variables

  public currentPage: number = 1;

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

 // Método para aplicar os filtros
 public search() {
  this.filteredList = this.list.filter(expense => {
    // Filtro por termo de busca geral
    if (this.searchTerm && !(
      expense.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      expense.user.toLowerCase().includes(this.searchTerm.toLowerCase())
    )) {
      return false;
    }

    // Filtros individuais
    if (this.selectedProduct && !expense.product.toLowerCase().includes(this.selectedProduct.toLowerCase())) {
      return false;
    }
    if (this.selectedCategory && !expense.category.toLowerCase().includes(this.selectedCategory.toLowerCase())) {
      return false;
    }
    if (this.selectedUser && !expense.user.toLowerCase().includes(this.selectedUser.toLowerCase())) {
      return false;
    }
    if (this.minValue !== null && expense.value < this.minValue) {
      return false;
    }
    if (this.maxValue !== null && expense.value > this.maxValue) {
      return false;
    }
    if (this.startDate && new Date(expense.purchaseDate) < new Date(this.startDate)) {
      return false;
    }
    if (this.endDate && new Date(expense.purchaseDate) > new Date(this.endDate)) {
      return false;
    }
    if (this.paymentStartDate && new Date(expense.payDay) < new Date(this.paymentStartDate)) {
      return false;
    }
    if (this.paymentEndDate && new Date(expense.payDay) > new Date(this.paymentEndDate)) {
      return false;
    }
    if (this.selectedPaymentType && !expense.payMethod.toLowerCase().includes(this.selectedPaymentType.toLowerCase())) {
      return false;
    }
    if (this.selectedStatus && !expense.status.toLowerCase().includes(this.selectedStatus.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}

public clearFilters() {
  this.selectedProduct = '';
  this.selectedCategory = '';
  this.selectedUser = '';
  this.minValue = null;
  this.maxValue = null;
  this.startDate = null;
  this.endDate = null;
  this.paymentStartDate = null;
  this.paymentEndDate = null;
  this.selectedPaymentType = '';
  this.selectedStatus = '';
  this.filteredList = this.list; // Reset the filtered list
}

  // public search() {
  //   if (this.searchTerm) {
  //     this.filteredList = this.list.filter(record => 
  //       record.product.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       record.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //       record.user.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );

      
  //   } else {
  //     this.filteredList = this.list; 
  //   }
  // }

  public clear() {
    this.searchTerm = ''; 
    this.clearFilters();
   
  }

  public navigateToEdit(id: string): void {
    this._router.navigate(['/expenses-add-form', id]); 
  }

    public openDeleteModal(id: string): void {
      this.selectedExpenseId = id;
      this.isModalOpen = true; 
    }

  public confirmDelete(): void {
    if (this.selectedExpenseId) {
      this._expensesService.deleteExpense(this.selectedExpenseId).subscribe({
        next: response => {
          this.getExpenses(); 
          console.log("Despesa excluída com sucesso");
        },
        error: () => {
          console.error("Erro ao excluir despesa");
        }
      });
    }
  }
}
