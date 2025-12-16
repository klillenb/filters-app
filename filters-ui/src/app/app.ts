import { Component, signal } from '@angular/core';
import { FiltersTable } from './components/filters-table/filters-table';
import { FilterDialog } from './components/filter-dialog/filter-dialog';

@Component({
  selector: 'app-root',
  imports: [FiltersTable, FilterDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('filters-app-ui');

  isDialogOpen = signal(false);
  isInline = signal(false);

  openDialog() {
    this.isDialogOpen.set(true);
  }

  toggleInlineMode(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isInline.set(target.checked);
  }
}
