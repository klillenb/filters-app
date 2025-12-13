import { Component, EventEmitter, Output } from '@angular/core';
import { FilterRowValue } from '../../models/filter-row';
import { FilterRow } from '../filter-row/filter-row';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [FilterRow, FormsModule],
  templateUrl: './filter-dialog.html',
  styleUrl: './filter-dialog.css',
})
export class FilterDialog {
  @Output() closed = new EventEmitter<{ name: string; criteria: FilterRowValue[] } | null>();

  filterName: string = '';
  criteriaRows: (FilterRowValue | null)[] = [null];

  addRow() {
    this.criteriaRows.push({
      field: 'Amount',
      operator: 'More',
      value: ''
    });
  }

  getRowChangeFn(index: number) {
    return (value: FilterRowValue | null) => {
      this.criteriaRows[index] = value;
    };
  }

  close() {
    this.closed.emit(null);
  }

  confirm() {
    this.closed.emit({
      name: this.filterName.trim(),
      criteria: this.criteriaRows as FilterRowValue[],
    });

    console.log(closed)
  }
}
