import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([{ path: '', children: [] }]),
        // Pin the system preference to light so the theme tests are deterministic.
        { provide: MediaMatcher, useValue: { matchMedia: () => ({ matches: false }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    document.documentElement.style.colorScheme = '';
  });

  it('renders the app name in the toolbar', () => {
    expect(element.querySelector('mat-toolbar')?.textContent).toContain('Progressa');
  });

  it('gives every icon-only toolbar button an accessible name', () => {
    const buttons = Array.from(element.querySelectorAll('mat-toolbar button'));

    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button.getAttribute('aria-label')).toBeTruthy();
    }
  });

  it('toggles the navigation and reports its state with aria-expanded', async () => {
    const menuButton = element.querySelector(
      'button[aria-controls="app-sidenav"]',
    ) as HTMLButtonElement;
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    menuButton.click();
    await fixture.whenStable();

    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('switches the whole page to dark mode from the theme button', async () => {
    const themeButton = element.querySelector(
      'button[aria-label="Switch to dark theme"]',
    ) as HTMLButtonElement;

    themeButton.click();
    await fixture.whenStable();

    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(themeButton.getAttribute('aria-label')).toBe('Switch to light theme');
  });

  it('wraps the routed content in a focusable main landmark for the skip link', () => {
    const main = element.querySelector('main#main-content');

    expect(main).not.toBeNull();
    expect(main?.getAttribute('tabindex')).toBe('-1');
  });

  it('moves focus to the main content from the skip link without navigating', () => {
    const skipLink = element.querySelector('.skip-link') as HTMLAnchorElement;
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });

    skipLink.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(element.querySelector('main'));
  });

  it('marks the active navigation link with aria-current="page"', async () => {
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();

    expect(element.querySelector('mat-nav-list a')?.getAttribute('aria-current')).toBe('page');
  });
});
