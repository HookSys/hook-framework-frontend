import { Component, Input, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { APP_ENDPOINTS } from "view-engine/const/endpoints.config";
import { IViewEngineFeature } from './ve-feature.interface';

@Injectable()
export class ViewEngineFeatureService {
  constructor( private http: HttpClient ) { }

  public get( id: number ): Observable<IViewEngineFeature> {
    const inclusionFilter = {
      include: [{
        relation: 'entrypoint',
        scope: {
          include: [{ relation: 'children' }]
        }
      }],
    };
    return this.http.get<IViewEngineFeature>( `${APP_ENDPOINTS.FEATURE}/${id}`, {
      params: new HttpParams({
        fromString: `filter=${encodeURIComponent(JSON.stringify(inclusionFilter))}`,
      })
    });

  }

}
