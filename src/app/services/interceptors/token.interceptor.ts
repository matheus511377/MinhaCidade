import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private usuarioService : UsuarioService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => event), // pass further respone
            catchError((error: HttpErrorResponse) => {
               
                // here will be catched error from response, just check if its 401
                if (error && error.status == 401)
                    // then logout e.g. this.authService.logout()
                return throwError(error);
            }));
    }
    
}
