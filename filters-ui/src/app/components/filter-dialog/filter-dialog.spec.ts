import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialog } from './filter-dialog';
import { ApiService } from '../../services/api';
import { signal, WritableSignal } from '@angular/core';
import { FilterReloadService } from '../../services/filter-reload';
import { Criteria } from '../../models/criteria';
import { of, throwError } from 'rxjs';
import { Filter } from '../../models/filter';

describe('FilterDialog', () => {
  let component: FilterDialog;
  let fixture: ComponentFixture<FilterDialog>;
  let apiService: {
    createFilter: ReturnType<typeof vi.fn>;
  };
  let reloadService: {
    trigger: ReturnType<typeof vi.fn>;
  };
  let openSignal: WritableSignal<boolean>;

  beforeEach(async () => {
    apiService = {
      createFilter: vi.fn(),
    };

    reloadService = {
      trigger: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FilterDialog],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: FilterReloadService, useValue: reloadService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDialog);
    component = fixture.componentInstance;

    openSignal = signal(true);
    component.open = openSignal;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add criteria row', () => {
    component.addRow();

    expect(component.criteriaRows.length).toBe(2);
  });

  it('should remove a criteria row', () => {
    component.addRow();
    component.removeRow(0);

    expect(component.criteriaRows.length).toBe(1);
  });

  it('should update a row via getRowChangeFn', () => {
    const updated: Criteria = {
      name: 'Title',
      condition: 'Starts',
      value: 'xd',
    };

    component.getRowChangeFn(0)(updated);

    expect(component.criteriaRows[0]).toEqual(updated);
  });

  it('should close the dialog', () => {
    component.close();

    expect(openSignal()).toBe(false);
  });

  it('should alert and not submit if validation fails', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.filterName = '';
    component.confirm();

    expect(alertSpy).toHaveBeenCalledWith('Not all fields are filled');
    expect(apiService.createFilter).not.toHaveBeenCalled();
    expect(openSignal()).toBe(true);

    alertSpy.mockRestore();
  });

  it('should submit filter, trigger reload and close dialog on success', () => {
    const apiResponse: Filter = {
      name: 'My Filter',
      criteria: component.criteriaRows,
    };

    apiService.createFilter.mockReturnValue(of(apiResponse));
    component.filterName = 'My Filter';

    component.confirm();

    expect(apiService.createFilter).toHaveBeenCalledWith(apiResponse);
    expect(reloadService.trigger).toHaveBeenCalled();
    expect(openSignal()).toBe(false);
  });

  it('should alert on API error', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const error = new Error('Error communicating with backend!');

    apiService.createFilter.mockReturnValue(throwError(() => error));

    component.filterName = 'My filter';
    component.confirm();

    expect(alertSpy).toHaveBeenCalledWith(error);
    expect(reloadService.trigger).not.toHaveBeenCalled();
    expect(openSignal()).toBe(true);

    alertSpy.mockRestore();
  });
});
