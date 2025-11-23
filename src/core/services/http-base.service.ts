import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams): Observable<Result<T>> {
    return this.http.get<Result<T>>(url, { params })
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<Result<T>> {
    return this.http.post<Result<T>>(url, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<Result<T>> {
    return this.http.put<Result<T>>(url, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<Result<T>> {
    return this.http.delete<Result<T>>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error('HTTP Error:', err);
    return throwError(() => err);
  }
}
