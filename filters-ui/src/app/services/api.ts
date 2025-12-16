import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Filter } from '../models/filter';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = `${environment.apiBaseUrl}/filters`;

  private readonly http: HttpClient = inject(HttpClient);

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  createFilter(filter: Filter): Observable<Filter> {
    return this.http.post<Filter>(this.baseUrl, filter).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`API error:`, error);
    return throwError(() => new Error('Error communicating with backend!'));
  }
}
