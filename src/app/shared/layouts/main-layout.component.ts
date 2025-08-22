import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SideBarMenuComponent } from '../components/menu-side-bar/side-bar-menu.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SideBarMenuComponent,
    FooterComponent,
  ],
  providers: [],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header></app-header>
      <div class="flex flex-grow">
        <div class="flex flex-col flex-grow">
          <main class="flex-grow">
            <router-outlet></router-outlet>
          </main>
          <app-footer />
        </div>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {}
