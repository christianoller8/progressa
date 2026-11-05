import { Component } from '@angular/core';

import { APP_NAME } from '../../core/app-name';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly title = `Welcome to ${APP_NAME}`;
}
