import { Component, EventEmitter, Output } from '@angular/core';
import { Criteria } from '../../models/criteria';
import { FilterRow } from '../filter-row/filter-row';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [FilterRow, FormsModule],
  templateUrl: './filter-dialog.html',
  styleUrl: './filter-dialog.css',
})
export class FilterDialog {
  @Output() closed = new EventEmitter<{ name: string; criteria: Criteria[] } | null>();

  filterName: string = '';
  criteriaRows: (Criteria | null)[] = [null];

  addRow() {
    this.criteriaRows.push({
      name: 'Amount',
      condition: 'More',
      value: ''
    });
  }

  getRowChangeFn(index: number) {
    return (value: Criteria | null) => {
      this.criteriaRows[index] = value;
    };
  }

  close() {
    this.closed.emit(null);
  }

  confirm() {
    this.closed.emit({
      name: this.filterName.trim(),
      criteria: this.criteriaRows as Criteria[],
    });

    console.log(closed)
  }
}
