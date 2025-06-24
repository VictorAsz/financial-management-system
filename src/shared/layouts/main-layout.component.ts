
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SideBarMenuComponent } from '../components/menu-side-bar/side-bar-menu.component';
import { FooterComponent } from '../../app/shared/components/footer/footer.component';
import { HeaderComponent } from '../../app/shared/components/header/header.component';


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
            <app-menu-side-bar></app-menu-side-bar>
            <div class="flex flex-col flex-grow">
            <main class="flex-grow">
                <router-outlet></router-outlet>
            </main>
            <footer class="w-full bg-gray-800 text-white flex justify-center items-center p-4">
                <p>Made By Victor A.S</p>
            </footer>
            </div>
        </div>
    </div>
  `,
})
export class MainLayoutComponent {
}
