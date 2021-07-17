import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class HttpConfigInterceptor  implements HttpInterceptor {  
  constructor() {}  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem('token') as string;
    let newHeaders = request.headers;

    if (authToken) {
      newHeaders = newHeaders.append('authtoken', authToken);
    }

    const authReq = request.clone({ headers: newHeaders });
    
    return next.handle(authReq);
  }
}
