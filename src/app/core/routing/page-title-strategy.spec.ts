import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { PageTitleStrategy } from './page-title-strategy';

@Component({ template: '' })
class EmptyPage {}

describe('PageTitleStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'with-title', title: 'Lessons', component: EmptyPage },
          { path: 'without-title', component: EmptyPage },
        ]),
        { provide: TitleStrategy, useClass: PageTitleStrategy },
      ],
    });
  });

  it('appends the app name to the route title', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/with-title');

    expect(TestBed.inject(Title).getTitle()).toBe('Lessons | Progressa');
  });

  it('falls back to the app name when the route has no title', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/without-title');

    expect(TestBed.inject(Title).getTitle()).toBe('Progressa');
  });
});
