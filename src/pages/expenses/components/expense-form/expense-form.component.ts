import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseRecord } from '../../models/expense-record';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _expensesService: ExpensesService
  ) {
    this.form = this.fb.group({
      id: [''],
      product: ['', Validators.required],
      category: ['', Validators.required],
      user: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      purchaseDate: [''],
      payDay: [''],
      payMethod: [''],
      status: ['', Validators.required],
      installments: [''],
      actualInstallments: [''],
      isActive: [true],
    });

   }

  ngOnInit() {
  }


  public Finish(): void {
    if (this.form.valid) {
      const expenseRecord: ExpenseRecord = this.form.value;
   
      this._expensesService.createExpenses(expenseRecord).subscribe({
        next: response => {        
          console.log("Expense Criada")
          this._router.navigate(['/expenses-list']);
        },
        error: (err) => {
          console.log("Erro ao criar despesa:" + (err.error.message || 'Erro desconhecido'));
         
        }
      });
    } else {
      console.log('O formulário é inválido');
    }

  }

  toggleIsActive() {
    const currentValue = this.form.get('isActive')?.value;
    this.form.patchValue({ isActive: !currentValue });
  }

  public Return(){
    this._router.navigate(['/expenses-list'])
  }
}
