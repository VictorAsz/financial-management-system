import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ExpenseRecord } from '../models/expense-record';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RetExpense } from '../models/ret-expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

constructor(
  private _httpClient: HttpClient
) { }

private readonly HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

LOCAL_URL: string = "http://localhost:3000"
END_POINT: string = "expenses"


public getExpenses(): Observable<RetExpense>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams()

  const url = `${this.LOCAL_URL}/${this.END_POINT}`

  return this._httpClient.get<RetExpense>(url, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}

}
