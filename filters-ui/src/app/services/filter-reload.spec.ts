import { TestBed } from '@angular/core/testing';

import { FilterReloadService } from './filter-reload';

describe('FilterReload', () => {
  let service: FilterReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize reload signal with 0', () => {
    expect(service.reload()).toBe(0);
  });

  it('should increment reload signal when trigger is called', () => {
    service.trigger();

    expect(service.reload()).toBe(1);
  });

  it('should increment reload signal multiple times', () => {
    service.trigger();
    service.trigger();
    service.trigger();

    expect(service.reload()).toBe(3);
  });
});
