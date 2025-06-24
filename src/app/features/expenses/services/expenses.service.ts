import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ExpenseRecord } from '../models/expense-record';
import { HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { RetExpense } from '../models/ret-expense';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {

constructor(
  private _httpClient: HttpClient
) { }

private readonly HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');

LOCAL_URL: string = "http://localhost:3000"
END_POINT: string = "expenses"


public getExpenses(): Observable<ExpenseRecord[]>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams()

  const url = `${this.LOCAL_URL}/expenses`

  return this._httpClient.get<ExpenseRecord[]>(url, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}
public createExpenses(record: ExpenseRecord): Observable<ExpenseRecord>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams()

  const url = `${this.LOCAL_URL}/expenses`

  return this._httpClient.post<ExpenseRecord>(url, record, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}
public updateExpense(record: ExpenseRecord): Observable<ExpenseRecord>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams()

  const url = `${this.LOCAL_URL}/expenses/${record.id}`

  return this._httpClient.put<ExpenseRecord>(url, record, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}
public deleteExpense(id: string): Observable<Error>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams()

  const url = `${this.LOCAL_URL}/expenses/${id}`

  return this._httpClient.delete<Error>(url, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}
public getExpense(id: string): Observable<ExpenseRecord>{
  
  const headers: HttpHeaders = this.HTTP_HEADERS
  const params: HttpParams = new HttpParams().set("id", id)

  const url = `${this.LOCAL_URL}/expenses/${id}`

  return this._httpClient.get<ExpenseRecord>(url, {'headers': headers})
  .pipe(take(1),
  tap( response => {console.log('Response:', response)}, )
)

}



}
