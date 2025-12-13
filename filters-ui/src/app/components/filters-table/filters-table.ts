import { Component, inject } from '@angular/core';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filters-table',
  imports: [AsyncPipe],
  templateUrl: './filters-table.html',
  styleUrl: './filters-table.css',
})
export class FiltersTable {
  private readonly apiService: ApiService = inject(ApiService);

  filters$: Observable<Filter[]> = this.apiService.getFilters();
}
