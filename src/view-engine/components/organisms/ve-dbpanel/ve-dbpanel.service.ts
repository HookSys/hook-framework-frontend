import { ViewEngineComponent } from './../../../engine/engine.component';
import { SchematicObjectWithRelations } from './../../../api/models/schematic-object-with-relations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbPanelWithRelations } from 'view-engine/api/models';
import { DbPanelControllerService } from 'view-engine/api/services';
import { tap, finalize } from 'rxjs/operators';

export enum EViewEngineDbPanelStates {
  GRID = 'GRID',
  EDIT = 'EDIT',
  NEW = 'NEW'
};

@Injectable({
  providedIn: ViewEngineComponent
})
export class ViewEngineDbPanelService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public state: BehaviorSubject<EViewEngineDbPanelStates> = new BehaviorSubject<EViewEngineDbPanelStates>(EViewEngineDbPanelStates.GRID);
  public records: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public selected: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public component: BehaviorSubject<DbPanelWithRelations> = new BehaviorSubject<DbPanelWithRelations>(({} as DbPanelWithRelations));

  private schematics: SchematicObjectWithRelations;

  constructor(private dbPanelService: DbPanelControllerService) {
  }

  public build(schematics: SchematicObjectWithRelations): void {
    this.schematics = schematics;
    this.dbPanelService.metadata({ id: schematics.handlerId }).pipe(
      tap(()=> this.isLoading.next(true)),
      finalize(() => this.isLoading.next(false))
    ).subscribe((dbpanel) => this.component.next(dbpanel));
  }

  public activate(): void {
    this.dbPanelService.getAllRecords({ id: this.schematics.handlerId }).pipe(
      tap(()=> this.isLoading.next(true)),
      finalize(() => this.isLoading.next(false))
    ).subscribe((records) => this.records.next(records));
  }

  public setState(state: EViewEngineDbPanelStates): void {
    this.state.next(state);
  }

  public selectRecord(record: object) {
    this.selected.next(record);
  }
}
