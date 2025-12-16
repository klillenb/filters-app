import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRow } from './filter-row';

describe('FilterRow', () => {
  let component: FilterRow;
  let fixture: ComponentFixture<FilterRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize conditionList on ngOnInit', () => {
    component.field = 'Title';
    component.ngOnInit();
    expect(component.conditionList).toEqual(['Starts with', 'Ends with', 'Contains']);
  });

  it('should return correct inputType based on field', () => {
    component.field = 'Amount';
    expect(component.inputType).toBe('number');

    component.field = 'Date';
    expect(component.inputType).toBe('date');

    component.field = 'Title';
    expect(component.inputType).toBe('text');
  });

  it('should reset values and update conditionList on field change', () => {
    const emitSpy = vi.spyOn(component.valueChange, 'emit');

    component.field = 'Date';
    component.condition = 'From';
    component.value = '2025-12-16';

    component.onFieldChange();

    expect(component.condition).toBe('');
    expect(component.value).toBe('');
    expect(component.conditionList).toEqual(['From', 'To']);
    expect(emitSpy).toHaveBeenCalledWith({
      name: 'Date',
      condition: '',
      value: '',
    });
  });

  it('should emit valueChange correctly when emitChange is called', () => {
    const emitSpy = vi.spyOn(component.valueChange, 'emit');

    component.field = 'Amount';
    component.condition = 'More';
    component.value = 100;

    component.emitChange();

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'Amount',
      condition: 'More',
      value: 100,
    });
  });
});
