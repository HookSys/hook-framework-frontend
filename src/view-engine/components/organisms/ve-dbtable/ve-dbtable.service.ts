import { Component, Input, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { APP_ENDPOINTS } from "view-engine/const/endpoints.config";
import { IViewEngineDbTable } from "./ve-dbtable.interface";
import { IViewEngineField } from "view-engine/components/molecules/ve-form/ve-form.interface";

@Injectable()
export class ViewEngineDbTableService {
  constructor( private http: HttpClient) { }

  public get( id: string ): Observable<IViewEngineDbTable> {
    const inclusionFilter = {
      include: [
        {
          relation: "fields",
        },
        {
          relation: "children",
        },
      ],
    };
    return this.http.get<IViewEngineDbTable>( `${APP_ENDPOINTS.DBPANEL}/${id}`, {
      params: new HttpParams( {
        fromString: `filter=${encodeURIComponent(
          JSON.stringify( inclusionFilter )
        )}`,
      } ),
    } );
  }

  public getFields( id: number ): Observable<IViewEngineField[]> {
    const inclusionFilter = {
      include: [
        {
          relation: "domain",
        },
      ],
    };
    return this.http.get<IViewEngineField[]>(
      `${APP_ENDPOINTS.DBPANEL}/${id}/fields`,
      {
        params: new HttpParams({
          fromString: `filter=${encodeURIComponent(JSON.stringify(inclusionFilter))}`,
        })
      }
    );
  }

  public getData( endpoint: string ): Observable<any> {
    return this.http.get<any>( endpoint );
  }

  public createData( endpoint: string, data: any ): Observable<any> {
    return this.http.post<any>( endpoint, {
      ...data,
      createdAt: new Date().toISOString(),
    } );
  }

  public saveData( endpoint: string, data: any ): Observable<any> {
    return this.http.patch<any>( endpoint, {
      ...data,
      updatedAt: new Date().toISOString(),
    } );
  }

  public deleteData( endpoint: string ): Observable<any> {
    return this.http.delete<any>( endpoint);
  }
}
