import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldType } from '../../types/field-type';
import { Criteria } from '../../models/criteria';

@Component({
  selector: 'app-filter-row',
  imports: [FormsModule],
  templateUrl: './filter-row.html',
  styleUrl: './filter-row.css',
})
export class FilterRow implements OnInit {
  @Output() valueChange = new EventEmitter<Criteria>();

  fields: FieldType[] = ['Amount', 'Title', 'Date'];

  field: FieldType = 'Amount';
  condition: string = '';
  value: number | string = '';

  conditionList: string[] = [];

  private conditionMap: Record<FieldType, string[]> = {
    Amount: ['More', 'Less', 'Equal'],
    Title: ['Starts with', 'Ends with', 'Contains'],
    Date: ['From', 'To'],
  };

  ngOnInit(): void {
    this.conditionList = this.conditionMap[this.field];
  }

  get inputType(): string {
    switch (this.field) {
      case 'Amount':
        return 'number';
      case 'Date':
        return 'date';
      default:
        return 'text';
    }
  }

  onFieldChange(): void {
    this.condition = '';
    this.value = '';
    this.conditionList = this.conditionMap[this.field];
    this.emitChange();
  }

  emitChange(): void {
    this.valueChange.emit({
      name: this.field,
      condition: this.condition,
      value: this.value,
    });
  }
}
