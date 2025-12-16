import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersTable } from './filters-table';
import { ApiService } from '../../services/api';
import { signal } from '@angular/core';
import { FilterReloadService } from '../../services/filter-reload';
import { of } from 'rxjs';

describe('FiltersTable', () => {
  let component: FiltersTable;
  let fixture: ComponentFixture<FiltersTable>;

  let apiService: {
    getFilters: ReturnType<typeof vi.fn>;
  };

  let reloadService: {
    reload: ReturnType<typeof signal<number>>;
  };

  beforeEach(async () => {
    apiService = {
      getFilters: vi.fn(),
    };

    reloadService = {
      reload: signal(0),
    };

    await TestBed.configureTestingModule({
      imports: [FiltersTable],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: FilterReloadService, useValue: reloadService },
      ],
    }).compileComponents();

    apiService.getFilters.mockReturnValue(of([]));

    fixture = TestBed.createComponent(FiltersTable);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch filters on init', () => {
    expect(apiService.getFilters).toHaveBeenCalledTimes(1);
    expect(component.filters$).toBeTruthy();
  });
});
