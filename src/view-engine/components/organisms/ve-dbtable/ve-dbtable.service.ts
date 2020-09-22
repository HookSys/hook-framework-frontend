import { Component, Input, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { APP_ENDPOINTS } from "view-engine/const/endpoints.config";
import { IViewEngineDbTable } from "./ve-dbtable.interface";
import { map } from 'rxjs/operators';

@Injectable()
export class ViewEngineDbTableService {
  constructor( private http: HttpClient ) { }

  public get( id: string ): Observable<IViewEngineDbTable> {
    const inclusionFilter = {
      include: [{
        relation: 'fields',
      }],
    };
    return this.http.get<IViewEngineDbTable>( `${APP_ENDPOINTS.DBPANEL}/${id}`, {
      params: new HttpParams({
        fromString: `filter=${encodeURIComponent(JSON.stringify(inclusionFilter))}`,
      })
    });
  }

  public getData(endpoint: string): Observable<any> {
    return this.http.get<any>(endpoint)
  }
}
