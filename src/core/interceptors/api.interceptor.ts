import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  console.log(
    '%c🌐 Interceptor ejecutado → Request saliente:',
    'color: green; font-weight: bold;',
    req.method,
    req.url
  );
  return next(req).pipe(
    catchError((error) => {
      console.error('API Error:', error);
      return throwError(() => error);
    })
  );
};
