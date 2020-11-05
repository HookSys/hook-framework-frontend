/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { NewSchematicObject } from '../models/new-schematic-object';
import { SchematicObject } from '../models/schematic-object';
import { SchematicObjectPartial } from '../models/schematic-object-partial';
import { SchematicObjectWithRelations } from '../models/schematic-object-with-relations';

@Injectable({
  providedIn: 'root',
})
export class SchematicObjectControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation schematicObjectControllerFindById
   */
  static readonly SchematicObjectControllerFindByIdPath = '/schematic-objects/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: {
    id: number;
    filter?: any;

  }): Observable<StrictHttpResponse<SchematicObjectWithRelations>> {

    const rb = new RequestBuilder(this.rootUrl, SchematicObjectControllerService.SchematicObjectControllerFindByIdPath, 'get');
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
        return r as StrictHttpResponse<SchematicObjectWithRelations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: {
    id: number;
    filter?: any;

  }): Observable<SchematicObjectWithRelations> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<SchematicObjectWithRelations>) => r.body as SchematicObjectWithRelations)
    );
  }

  /**
   * Path part for operation schematicObjectControllerCreate
   */
  static readonly SchematicObjectControllerCreatePath = '/schematic-objects/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: {
    id: number;
      body?: NewSchematicObject
  }): Observable<StrictHttpResponse<SchematicObject>> {

    const rb = new RequestBuilder(this.rootUrl, SchematicObjectControllerService.SchematicObjectControllerCreatePath, 'post');
    if (params) {

      rb.path('id', params.id, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SchematicObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: {
    id: number;
      body?: NewSchematicObject
  }): Observable<SchematicObject> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<SchematicObject>) => r.body as SchematicObject)
    );
  }

  /**
   * Path part for operation schematicObjectControllerDeleteById
   */
  static readonly SchematicObjectControllerDeleteByIdPath = '/schematic-objects/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: {
    id: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SchematicObjectControllerService.SchematicObjectControllerDeleteByIdPath, 'delete');
    if (params) {

      rb.path('id', params.id, {});

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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: {
    id: number;

  }): Observable<void> {

    return this.deleteById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation schematicObjectControllerUpdateById
   */
  static readonly SchematicObjectControllerUpdateByIdPath = '/schematic-objects/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById$Response(params: {
    id: number;
      body?: SchematicObjectPartial
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SchematicObjectControllerService.SchematicObjectControllerUpdateByIdPath, 'patch');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateById(params: {
    id: number;
      body?: SchematicObjectPartial
  }): Observable<void> {

    return this.updateById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation schematicObjectControllerFind
   */
  static readonly SchematicObjectControllerFindPath = '/schematic-objects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params?: {
    filter?: any;

  }): Observable<StrictHttpResponse<Array<SchematicObjectWithRelations>>> {

    const rb = new RequestBuilder(this.rootUrl, SchematicObjectControllerService.SchematicObjectControllerFindPath, 'get');
    if (params) {

      rb.query('filter', params.filter, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SchematicObjectWithRelations>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params?: {
    filter?: any;

  }): Observable<Array<SchematicObjectWithRelations>> {

    return this.find$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SchematicObjectWithRelations>>) => r.body as Array<SchematicObjectWithRelations>)
    );
  }

}
