import { Component, Input, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { APP_ENDPOINTS } from '../config/endpoints.config';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public auth(username: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(APP_ENDPOINTS.AUTH, {
      username, password
    }).pipe(map(({ token }) => token))
  }

  public me(): Observable<User> {
    const inclusionFilter = {
      include: [{
        relation: 'policies',
        scope: {
          include: [{
            relation: 'features',
          }]
        }
      }],
    };
    return this.http.get<User>(APP_ENDPOINTS.ME, {
      params: new HttpParams({
        fromString: `filter=${encodeURIComponent(JSON.stringify(inclusionFilter))}`,
      })});
  }
}
