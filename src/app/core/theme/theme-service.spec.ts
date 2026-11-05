import { MediaMatcher } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  const root = document.documentElement;

  function setup(systemPrefersDark: boolean): ThemeService {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MediaMatcher,
          useValue: { matchMedia: () => ({ matches: systemPrefersDark }) },
        },
      ],
    });
    return TestBed.inject(ThemeService);
  }

  afterEach(() => {
    root.style.colorScheme = '';
  });

  it('starts in light mode when the system prefers light', () => {
    const service = setup(false);

    expect(service.theme()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('starts in dark mode when the system prefers dark', () => {
    const service = setup(true);

    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);
  });

  it('applies the theme to <html> so overlays outside <app-root> follow it', () => {
    const service = setup(false);
    TestBed.tick();
    expect(root.style.colorScheme).toBe('light');

    service.toggle();
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(root.style.colorScheme).toBe('dark');
  });

  it('goes back to the original theme on a second toggle', () => {
    const service = setup(false);

    service.toggle();
    service.toggle();
    TestBed.tick();

    expect(service.theme()).toBe('light');
    expect(root.style.colorScheme).toBe('light');
  });
});
