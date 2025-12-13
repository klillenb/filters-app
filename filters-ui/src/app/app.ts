import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltersTable } from './components/filters-table/filters-table';

@Component({
  selector: 'app-root',
  imports: [FiltersTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('filters-app-ui');
}
