
import { MainPageComponent } from '../home/components/main-page/main-page.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from '../pages/expenses/components/expense-list/expense-list.component';
import { ExpenseFormComponent } from '../pages/expenses/components/expense-form/expense-form.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'expenses-list', component: ExpenseListComponent},
  { path: 'expenses-add-form/:id', component: ExpenseFormComponent},
];

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });