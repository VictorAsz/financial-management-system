import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from './shared/components/menu-side-bar/side-bar-menu.component';
import { ExpenseListComponent } from './features/expenses/components/expense-list/expense-list.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesService } from './features/expenses/services/expenses.service';
import { TransactionListComponent } from './features/transactions/transaction-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    CommonModule
    ,RouterOutlet
    ,RouterLink
    ,RouterLinkActive
    ,HttpClientModule
    ,SideBarMenuComponent
    ,FooterComponent
    ,HeaderComponent
    ,ExpenseListComponent
    ,TransactionListComponent

  ],
  providers: [
    ExpensesService,
  ],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'ERP-domestico';
}
