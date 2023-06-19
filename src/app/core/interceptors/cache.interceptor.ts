import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cachablePaths: string[] = [
    '/api/courses'
  ];

  private _cache = new Map<string, any>();

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    

    return next.handle(request).pipe(
      tap(res => {
        if (!(res instanceof HttpResponse)) {
          return;
        }

        if (request.method === 'GET' && this.cachablePaths.some(path => request.url.startsWith(path))) {

        }
      })
    );
  }
}
