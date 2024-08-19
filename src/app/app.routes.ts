
import { MainPageComponent } from '../home/components/main-page/main-page.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from '../pages/expenses/components/expense-list/expense-list.component';


export const routes: Routes = [
{ path: 'home', component: MainPageComponent },
{ path: 'expenses-list', component: ExpenseListComponent },
];

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });