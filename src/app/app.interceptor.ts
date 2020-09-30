import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    // baseUrl: String = 'https://serasa.afinata.com/api';
    baseUrl: String = 'http://localhost:3000/api';
    constructor(private storageService: StorageService,
                private router: Router) {
                }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            url: `${this.baseUrl}${req.url}`,
            headers: req.headers.set('Authorization', this.getTokenAuth())
        });
        return next.handle(authReq);
    }

    getTokenAuth() {
        return `Bearer ${this.storageService.get('AUTH')}`;
    }

    logout(): Observable<any> {
        this.storageService.clear('AUTH');
        this.router.navigate(['login']);
        return Observable.throw('bad token');
    }
}
