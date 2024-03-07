import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AuthUtils } from './auth/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {    // Clone the request object
    let newReq = req.clone();

    // Check if the access token is valid and add the Authorization header if it is
    if (this.authService.accessToken && !AuthUtils.isTokenExpired(this.authService.accessToken)) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken),
      });
    }

    // Handle 401 Unauthorized responses
    return next(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out and reload the app
          this.authService.signOut();
          location.reload();
        }
        return throwError(error);
      })
    );
  }
}
