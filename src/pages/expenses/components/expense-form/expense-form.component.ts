import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
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
  private id: string = "0";

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _expensesService: ExpensesService
  ) {
    this.form = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      user: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      purchaseDate: [''],
      payDay: [''],
      payMethod: [''],
      status: [''],
      installments: [''],
      actualInstallments: [''],
      isActive: [true],
    });

   }

  ngOnInit() {

    if(this._route.snapshot.paramMap.get('id') === "0"){
      this.id = "0"
    }else{
      this.id = this._route.snapshot.paramMap.get("id") || "0";    
      this.GetExpense()
    }
    
  }


  public GetExpense(): void{

    this._expensesService.getExpense(this.id).subscribe({
      next: response => {        
        this.form.patchValue(response);
      },

      error: (err) => {
        console.log("Erro ao buscar lançamento:" + (err.error.message || 'Erro desconhecido'));      
      }
      
    });
  
    console.log(this.form)
}


  public Create(): void {

    if (this.form.valid) {
      const record: ExpenseRecord = this.form.value;
   
      this._expensesService.createExpenses(record).subscribe({
        next: response => {        
          console.log("Despesa Criada")
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

  public Update(): void {

    if (this.form.valid) {
      const record: ExpenseRecord = this.form.value;
      record.id = this.id
      this._expensesService.updateExpense(record).subscribe({
        next: response => {        
          console.log("Despesa atualizada")
          this._router.navigate(['/expenses-list']);
        },
        error: (err) => {
          console.log("Erro ao atualizar despesa:" + (err.error.message || 'Erro desconhecido'));
         
        }
      });
    } else {
      console.log('O formulário é inválido');
    }
  }
  public Finish(): void {
   if(this.id === '0'){
      this.Create()
   }else{
      this.Update()
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
