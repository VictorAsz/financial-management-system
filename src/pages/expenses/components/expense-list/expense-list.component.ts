import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseRecord } from '../../models/expense-record';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'expense-list',
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {


  public list: ExpenseRecord[] = []

  constructor(
    private _expensesService: ExpensesService
  ) { }

  ngOnInit() {
    this.getExpenses()
    
  }


  public getExpenses(){
    this._expensesService.getExpenses().subscribe({
      next: response => { 
        this.list = response.records
      },
      error: () => {
        console.log("erro GetExpense")
      }

    })
  }


}
