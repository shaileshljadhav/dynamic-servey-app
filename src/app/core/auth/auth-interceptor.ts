import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq).pipe(
    retry({
      count: 1,
      delay: 1000
    }),

    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 ||
        error.status === 403
      ) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
