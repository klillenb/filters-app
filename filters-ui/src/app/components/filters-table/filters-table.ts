import { Component, effect, inject } from '@angular/core';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FilterReloadService } from '../../services/filter-reload';

@Component({
  selector: 'app-filters-table',
  imports: [AsyncPipe],
  templateUrl: './filters-table.html',
  styleUrl: './filters-table.css',
})
export class FiltersTable {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly reloadService: FilterReloadService = inject(FilterReloadService);

  filters$!: Observable<Filter[]>;

  constructor() {
    effect(() => {
      this.reloadService.reload();
      this.filters$ = this.apiService.getFilters();
    });
  }
}
