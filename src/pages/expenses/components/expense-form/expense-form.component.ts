import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  constructor(
    private _router: Router 
  ) { }

  ngOnInit() {
  }


  public Finish(){

    this._router.navigate(['/expenses-add-form']);

  }
}
