import { MediaMatcher } from '@angular/cdk/layout';
import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

// Owns the light/dark choice for the whole app. The scheme is applied to <html>, not to a
// component host, so every surface follows it — including the CDK overlays (menus, dialogs,
// snackbars) that Angular Material renders outside <app-root>.
@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly systemPrefersDark = inject(MediaMatcher).matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  private readonly current = signal<Theme>(this.systemPrefersDark ? 'dark' : 'light');

  readonly theme = this.current.asReadonly();
  readonly isDark = computed(() => this.current() === 'dark');

  constructor() {
    effect(() => {
      this.document.documentElement.style.colorScheme = this.current();
    });
  }

  toggle(): void {
    this.current.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}
