
import { MainPageComponent } from './features/home/main-page.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseListComponent } from './features/expenses/components/expense-list/expense-list.component';
import { ExpenseFormComponent } from './features/expenses/components/expense-form/expense-form.component';
import { LoginScreenComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';
import { TransactionListComponent } from './features/transactions/transaction-list.component';


export const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: MainPageComponent ,  canActivate: [AuthGuard]},
        { path: 'expenses-list', component: ExpenseListComponent,  canActivate: [AuthGuard] },
        { path: 'expenses-add-form/:id', component: ExpenseFormComponent,  canActivate: [AuthGuard] },
        { path: 'transactions', component: TransactionListComponent,  canActivate: [AuthGuard] },
      ]
  },

  { path: 'login', component: LoginScreenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });