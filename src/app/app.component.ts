import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from '../template/menu-side-bar/side-bar-menu.component';
import { ExpenseListComponent } from '../pages/expenses/components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [
    CommonModule
    ,RouterOutlet
    ,RouterLink
    ,RouterLinkActive
    ,SideBarMenuComponent
    ,ExpenseListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ERP-domestico';
}
