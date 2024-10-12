import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideBarMenuComponent } from '../template/menu-side-bar/side-bar-menu.component';
import { ExpenseListComponent } from '../pages/expenses/components/expense-list/expense-list.component';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';

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
    ,FooterComponent
    ,HeaderComponent
    ,ExpenseListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ERP-domestico';
}
