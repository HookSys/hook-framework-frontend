/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserWithRelations } from '../models/user-with-relations';


@Injectable({
  providedIn: 'root',
})
export class AuthControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerAuth
   */
  static readonly AuthControllerAuthPath = '/auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `auth()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  auth$Response(params: {

    /**
     * The input of login function
     */
    body: { 'username': string, 'password': string }
  }): Observable<StrictHttpResponse<{ 'token'?: string }>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerAuthPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'token'?: string }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `auth$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  auth(params: {

    /**
     * The input of login function
     */
    body: { 'username': string, 'password': string }
  }): Observable<{ 'token'?: string }> {
    return this.auth$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'token'?: string }>) => r.body as { 'token'?: string })
    );
  }

  /**
   * Path part for operation authControllerMe
   */
  static readonly AuthControllerMePath = '/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `me()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Response(params?: {

  }): Observable<StrictHttpResponse<UserWithRelations>> {

    const rb = new RequestBuilder(this.rootUrl, AuthControllerService.AuthControllerMePath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as StrictHttpResponse<UserWithRelations>);
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `me$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  me(params?: {

  }): Observable<UserWithRelations> {

    return this.me$Response(params).pipe(
      map((r: StrictHttpResponse<UserWithRelations>) => r.body as UserWithRelations)
    );
  }

}
