import { Component, inject, Input, WritableSignal } from '@angular/core';
import { Criteria } from '../../models/criteria';
import { FilterRow } from '../filter-row/filter-row';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../models/filter';
import { ApiService } from '../../services/api';
import { FilterReloadService } from '../../services/filter-reload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-dialog',
  imports: [FilterRow, FormsModule, CommonModule],
  templateUrl: './filter-dialog.html',
  styleUrl: './filter-dialog.css',
})
export class FilterDialog {
  @Input({ required: true }) open!: WritableSignal<boolean>;
  @Input() inline: boolean = false;

  private readonly apiService: ApiService = inject(ApiService);
  private readonly reloadService: FilterReloadService = inject(FilterReloadService);

  defaultRow: Criteria = { name: 'Amount', condition: '', value: '' };
  filterName: string = '';
  criteriaRows: Criteria[] = [this.defaultRow];

  addRow(): void {
    this.criteriaRows.push({ ...this.defaultRow });
  }

  removeRow(index: number): void {
    this.criteriaRows.splice(index, 1);
  }

  getRowChangeFn(index: number) {
    return (value: Criteria) => {
      this.criteriaRows[index] = value;
    };
  }

  close(): void {
    this.open.set(false);
  }

  confirm(): void {
    if (this.filterName === '' || this.criteriaRows.length < 1) {
      alert('Not all fields are filled');
      return;
    }

    const data: Filter = {
      name: this.filterName,
      criteria: this.criteriaRows,
    };

    this.apiService.createFilter(data).subscribe({
      next: () => {
        this.reloadService.trigger();
        this.open.set(false);
      },
      error: (err) => alert(err),
    });
  }
}
