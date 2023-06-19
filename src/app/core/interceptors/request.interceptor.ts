import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageKeys } from '../utils/constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem(LocalStorageKeys.JwtToken);

    const clonedRequest = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      setHeaders: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    return next.handle(clonedRequest);
  }
}
