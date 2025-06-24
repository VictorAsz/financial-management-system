import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Router,
} from '@angular/router';
import { SupabaseService } from '../../../app/core/services/supabase.service';


@Component({
  selector: 'app-menu-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.css'],
})
export class SideBarMenuComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  async logout() {
    await this.supabase.client.auth.signOut();
    this.router.navigate(['/login'])
  }
}
