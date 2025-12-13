import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldType } from '../../types/field-type';
import { FilterRowValue } from '../../models/filter-row';

@Component({
  selector: 'app-filter-row',
  imports: [FormsModule],
  templateUrl: './filter-row.html',
  styleUrl: './filter-row.css',
})
export class FilterRow implements OnInit {
  @Input() defaultField: FieldType = 'Amount';
  @Output() valueChange = new EventEmitter<FilterRowValue | null>();

  fields: FieldType[] = ['Amount', 'Title', 'Date'];

  field: FieldType = this.defaultField;
  operator: string = '';
  value: any = '';

  operatorOptions: string[] = [];

  private operatorMap: Record<FieldType, string[]> = {
    Amount: ['More', 'Less', 'Equal'],
    Title: ['Starts with', 'Ends with', 'Contains'],
    Date: ['From', 'To'],
  };

  ngOnInit(): void {
    this.field = this.defaultField;
    this.operatorOptions = this.operatorMap[this.field];
  }

  onFieldChange() {
    this.operator = '';
    this.value = '';
    this.operatorOptions = this.operatorMap[this.field];
    this.emitChange();
  }

  emitChange() {
    if (this.field && this.operator && this.value !== '') {
      this.valueChange.emit({
        field: this.field,
        operator: this.operator,
        value: this.value,
      });
    } else {
      this.valueChange.emit(null);
    }
  }
}
