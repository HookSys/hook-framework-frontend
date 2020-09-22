import { Component, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_ENDPOINTS } from '../../../config/endpoints.config';
import { Metadata } from '../types';

@Injectable()
export class MetadataService {
  constructor(private http: HttpClient) {
  }

  public get(code: number): Observable<Metadata> {
    return this.http.get<Metadata>(`${APP_ENDPOINTS.DBPANEL}?code=${code}`);
  }
}
