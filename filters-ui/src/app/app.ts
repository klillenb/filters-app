import { Component, signal } from '@angular/core';
import { FiltersTable } from './components/filters-table/filters-table';
import { FilterDialog } from './components/filter-dialog/filter-dialog';
import { Criteria } from './models/criteria';

@Component({
  selector: 'app-root',
  imports: [FiltersTable, FilterDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('filters-app-ui');

  isDialogOpen: boolean = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  onDialogClose(result: { name: string; criteria: Criteria[] } | null) {
    this.isDialogOpen = false;

    console.log(result);
  }
}
