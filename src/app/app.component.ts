import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from '../template/menu-side-bar/side-bar-menu.component';
import { ExpenseListComponent } from '../pages/expenses/components/expense-list/expense-list.component';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesService } from '../pages/expenses/services/expenses.service';

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

  ],
  providers: [
    ExpensesService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ERP-domestico';
}
