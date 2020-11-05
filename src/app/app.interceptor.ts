import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from 'view-engine/store/auth/auth.state';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    // baseUrl: String = 'https://serasa.afinata.com/api';
    constructor(private router: Router,
                private store: Store) {
                }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', this.getTokenAuth())
        });
        return next.handle(authReq);
    }

    getTokenAuth() {
        const token = this.store.selectSnapshot(AuthState.token)
        return `Bearer ${token}`;
    }

    logout(): Observable<any> {
        this.router.navigate(['login']);
        return Observable.throw('bad token');
    }
}
