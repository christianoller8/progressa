import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { APP_NAME } from './core/app-name';
import { ThemeService } from './core/theme/theme-service';

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
})
export class App {
  protected readonly title = APP_NAME;
  protected readonly theme = inject(ThemeService);

  private readonly mainContent = viewChild.required<ElementRef<HTMLElement>>('mainContent');

  // Focus is moved by hand because a plain href="#main-content" resolves against
  // <base href="/"> and would navigate away from any nested route.
  protected skipToMainContent(event: Event): void {
    event.preventDefault();
    this.mainContent().nativeElement.focus();
  }
}
