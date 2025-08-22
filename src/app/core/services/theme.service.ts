import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private _isDark = false;

  constructor() {
    this.loadTheme();
  }

  isDark(): boolean {
    return this._isDark;
  }

  toggleTheme(): boolean {
    const html = document.documentElement;

    if (this._isDark) {
      html.classList.remove('dark');
      html.classList.add('light');
      this._isDark = false;
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      this._isDark = true;
    }

    localStorage.setItem(this.storageKey, this._isDark ? 'dark' : 'light');
    return this._isDark;
  }

  private loadTheme() {
    const saved = localStorage.getItem(this.storageKey);
    const html = document.documentElement;

    if (saved === 'dark') {
      html.classList.add('dark');
      this._isDark = true;
    } else if (saved === 'light') {
      html.classList.add('light');
      this._isDark = false;
    } else {
      // Tema do sistema
      this._isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (this._isDark) html.classList.add('dark');
    }
  }
}
