import { TestBed } from '@angular/core/testing';

import { ApiService } from './api';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../environment/environment';
import { Filter } from '../models/filter';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiBaseUrl}/filters`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch filters', () => {
    const mockFilters: Filter[] = [
      {
        id: 1,
        name: 'Filter 1',
        criteria: [],
      },
      {
        id: 2,
        name: 'Filter 2',
        criteria: [],
      },
    ];

    service.getFilters().subscribe((filters) => {
      expect(filters.length).toBe(2);
      expect(filters).toEqual(mockFilters);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockFilters);
  });

  it('should handle error on getFilters', () => {
    service.getFilters().subscribe({
      next: () => {
        throw new Error('Expected an error');
      },
      error: (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error communicating with backend!');
      },
    });

    const req = httpMock.expectOne(baseUrl);
    req.error(new ErrorEvent('Network error'), {
      status: 500,
      statusText: 'Server error',
    });
  });

  it('should create a filter', () => {
    const newFilter: Filter = {
      name: 'New filter',
      criteria: [],
    };

    service.createFilter(newFilter).subscribe((filter) => {
      expect(filter).toEqual(newFilter);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFilter);
    req.flush(newFilter);
  });

  it('should handle error on createFilter', () => {
    const newFilter: Filter = {
      name: 'New filter',
      criteria: [],
    };

    service.createFilter(newFilter).subscribe({
      next: () => {
        throw new Error('Expected an error');
      },
      error: (error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Error communicating with backend!');
      },
    });

    const req = httpMock.expectOne(baseUrl);
    req.error(new ErrorEvent('Network error'), {
      status: 500,
      statusText: 'Server error',
    });
  });
});
