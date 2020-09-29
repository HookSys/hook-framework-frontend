import { Injectable } from "@angular/core";
import {
  IViewEngineDbTableInstance,
  IViewEngineDbTable,
  EViewEngineDbTableModes,
} from "./ve-dbtable.interface";
import { VIEW_ENGINE_DBTABLE_NOTATION } from "./ve-dbtable.decorator";

@Injectable()
export class ViewEngineDbTableHandler {
  private dbtables: IViewEngineDbTableInstance[] = [];

  register(DbTable: IViewEngineDbTableInstance) {
    this.dbtables.push(new DbTable());
  }

  fireOnDblClick(dbtable: IViewEngineDbTable, data: any): void {
    this.dbtables.forEach((veDbTable) => {
      if (
        veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
        typeof veDbTable.onDblClick === "function"
      ) {
        veDbTable.onDblClick(dbtable, data);
      }
    });
  }

  fireOnChange(dbtable: IViewEngineDbTable, event: Event): void {
    this.dbtables.forEach((veDbTable) => {
      if (
        veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
        typeof veDbTable.onInputChange === "function"
      ) {
        veDbTable.onInputChange(dbtable, event);
      }
    });
  }

  fireOnBlur(dbtable: IViewEngineDbTable, event: Event): void {
    this.dbtables.forEach((veDbTable) => {
      if (
        veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
        typeof veDbTable.onInputBlur === "function"
      ) {
        veDbTable.onInputBlur(dbtable, event);
      }
    });
  }

  fireOnFocus(dbtable: IViewEngineDbTable, event: Event): void {
    this.dbtables.forEach((veDbTable) => {
      if (
        veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
        typeof veDbTable.onInputFocus === "function"
      ) {
        veDbTable.onInputFocus(dbtable, event);
      }
    });
  }

  fireOnBeforeLoad(dbtable: IViewEngineDbTable): Promise<boolean> {
    return new Promise((resolve) => {
      this.dbtables.forEach((veDbTable) => {
        if (
          veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
          typeof veDbTable.onBeforeLoad === "function"
        ) {
          veDbTable.onBeforeLoad(dbtable).then(resolve);
          return;
        }
        resolve(true)
      });
    });
  }

  fireOnBeforeClose(dbtable: IViewEngineDbTable): Promise<boolean> {
    return new Promise((resolve) => {
      this.dbtables.forEach((veDbTable) => {
        if (
          veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
          typeof veDbTable.onBeforeClose === "function"
        ) {
          veDbTable.onBeforeClose(dbtable).then(resolve);
        }
      });
    });
  }

  fireOnChangeGridMode(
    dbtable: IViewEngineDbTable,
    mode: EViewEngineDbTableModes
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.dbtables.forEach((veDbTable) => {
        if (
          veDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id === dbtable.id &&
          typeof veDbTable.onChangeGridMode === "function"
        ) {
          veDbTable.onChangeGridMode(dbtable, mode).then(resolve);
        }
      });
    });
  }

  unregister(dbtable: IViewEngineDbTableInstance) {
    this.dbtables = this.dbtables.filter((iDbTable) => {
      if (
        iDbTable[VIEW_ENGINE_DBTABLE_NOTATION].id !==
        dbtable[VIEW_ENGINE_DBTABLE_NOTATION].id
      ) {
        return iDbTable;
      }
    });
  }
}
