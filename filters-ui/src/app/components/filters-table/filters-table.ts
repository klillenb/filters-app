import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api';
import { map, Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filters-table',
  imports: [MatTableModule, MatButtonModule, AsyncPipe],
  templateUrl: './filters-table.html',
  styleUrl: './filters-table.css',
})
export class FiltersTable {
  private readonly apiService: ApiService = inject(ApiService);

  filters$: Observable<Filter[]> = this.apiService.getFilters();
}
