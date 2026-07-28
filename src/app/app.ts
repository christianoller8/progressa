import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[style.color-scheme]': 'theme()',
  },
})
export class App {
  protected readonly title = signal('Progressa');
  protected readonly theme = signal<'light' | 'dark'>('light');

  toggleTheme() {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}
