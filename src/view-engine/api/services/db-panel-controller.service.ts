/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { DbPanelWithRelations } from '../models/db-panel-with-relations';
import { DbPanel } from '../models/db-panel';
import { DbPanelPartial } from '../models/db-panel-partial';
import { NewDbPanel } from '../models/new-db-panel';

@Injectable({
  providedIn: 'root',
})
export class DbPanelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly DbPanelControllerMetadataPath = '/db-panels/{id}/metadata';
  metadata$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<DbPanelWithRelations>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerMetadataPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DbPanelWithRelations>;
      })
    );
  }
  metadata(params: {
    id: number;
  }): Observable<DbPanelWithRelations> {
    return this.metadata$Response(params).pipe(
      map((r: StrictHttpResponse<DbPanelWithRelations>) => r.body as DbPanelWithRelations)
    );
  }

  static readonly DbPanelControllerDatasourcePath = '/db-panels/{id}/datasource';
  getAllRecords$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<object[]>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerDatasourcePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<object[]>;
      })
    );
  }
  getAllRecords(params: {
    id: number;
  }): Observable<object[]> {
    return this.getAllRecords$Response(params).pipe(
      map((r: StrictHttpResponse<object[]>) => r.body as object[])
    );
  }

  createRecord$Response<T>(params: {
    id: number,
    record: T
  }): Observable<StrictHttpResponse<T>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerDatasourcePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.record, 'application/json')
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<T>) => {
        return r as StrictHttpResponse<T>;
      })
    );
  }
  createRecord<T>(params: {
    id: number,
    record: T
  }): Observable<T> {
    return this.createRecord$Response<T>(params).pipe(
      map((r: StrictHttpResponse<T>) => r.body as T)
    );
  }

  static readonly DbPanelControllerDatasourceIdPath = '/db-panels/{id}/datasource/{recordId}';
  deleteRecord$Response(params: {
    id: number,
    recordId: number
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerDatasourceIdPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('recordId', params.recordId, {});
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<void>) => {
        return r as StrictHttpResponse<void>;
      })
    );
  }
  deleteRecord(params: {
    id: number,
    recordId: number
  }): Observable<void> {
    return this.deleteRecord$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  saveRecord$Response<T>(params: {
    id: number,
    recordId: number,
    record: T
  }): Observable<StrictHttpResponse<T>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerDatasourceIdPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('recordId', params.recordId, {});
      rb.body(params.record, 'application/json')
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<T>) => {
        return r as StrictHttpResponse<T>;
      })
    );
  }
  saveRecord<T>(params: {
    id: number,
    recordId: number,
    record: T
  }): Observable<T> {
    return this.saveRecord$Response<T>(params).pipe(
      map((r: StrictHttpResponse<T>) => r.body as T)
    );
  }

  static readonly DbPanelControllerFindByIdPath = '/db-panels/{id}';
  findById$Response(params: {
    id: number;
    filter?: any;

  }): Observable<StrictHttpResponse<DbPanelWithRelations>> {

    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerFindByIdPath, 'get');
    if (params) {

      rb.path('id', params.id, {});
      rb.query('filter', params.filter, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DbPanelWithRelations>;
      })
    );
  }
  findById(params: {
    id: number;
    filter?: any;

  }): Observable<DbPanelWithRelations> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<DbPanelWithRelations>) => r.body as DbPanelWithRelations)
    );
  }

  static readonly DbPanelControllerUpdateByIdPath = '/db-panels/{id}';
  updateById$Response(params: {
    id: number;
      body?: DbPanelPartial
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerUpdateByIdPath, 'patch');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }
  updateById(params: {
    id: number;
      body?: DbPanelPartial
  }): Observable<void> {

    return this.updateById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  static readonly DbPanelControllerFindPath = '/db-panels';
  find$Response(params?: {
    filter?: any;
  }): Observable<StrictHttpResponse<Array<DbPanelWithRelations>>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerFindPath, 'get');
    if (params) {

      rb.query('filter', params.filter, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DbPanelWithRelations>>;
      })
    );
  }
  find(params?: {
    filter?: any;
  }): Observable<Array<DbPanelWithRelations>> {
    return this.find$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DbPanelWithRelations>>) => r.body as Array<DbPanelWithRelations>)
    );
  }

  static readonly DbPanelControllerCreatePath = '/db-panels';
  create$Response(params?: {
      body?: NewDbPanel
  }): Observable<StrictHttpResponse<DbPanel>> {
    const rb = new RequestBuilder(this.rootUrl, DbPanelControllerService.DbPanelControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DbPanel>;
      })
    );
  }
  create(params?: {
      body?: NewDbPanel
  }): Observable<DbPanel> {
    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<DbPanel>) => r.body as DbPanel)
    );
  }

}
