import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersTable } from './filters-table';

describe('FiltersTable', () => {
  let component: FiltersTable;
  let fixture: ComponentFixture<FiltersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
