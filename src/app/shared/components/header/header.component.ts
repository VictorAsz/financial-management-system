import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  constructor(
    private supabase: SupabaseService,
    private router: Router,
    public themeService: ThemeService
  ) {
      this.isDarkTheme = themeService.isDark();
  }

  ngOnInit() {}

  toggleTheme() {
    this.isDarkTheme = this.themeService.toggleTheme();
  }
  async logout() {
    await this.supabase.client.auth.signOut();
    this.router.navigate(['/login']);
  }
}
