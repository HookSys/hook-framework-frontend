import { IViewEngineField } from '../../atoms/ve-field/ve-field.interface';
import { VIEW_ENGINE_DBTABLE_NOTATION } from './ve-dbtable.decorator';

export interface IViewEngineDbTableDecorator {
  id: number
}

export enum EViewEngineDbTableType {
  FORM,
  GRID
}

export enum EViewEngineDbTableModes {
  EDIT = 'edit',
  GRID = 'grid',
  NEW = 'new',
  COPY = 'copy'
}

export interface IViewEngineDbTableParam {
  [key: string]: string
}

export interface IViewEngineOpenRecordEvent {
  data: IViewEngineDbTableParam,
  children: IViewEngineDbTable
}

export interface IViewEngineDbTable {
  id: number;
  name: string;
  desc: string;
  size: number;
  pk: string;
  isReadOnly: boolean;
  parent: number;
  controller: string;
  children: IViewEngineDbTable;
  fields: IViewEngineField[];
}

export interface IViewEngineDbTableHandler {
  onBeforeSave?(dbtable: IViewEngineDbTable): Promise<boolean>;
  onAfterSave?(dbtable: IViewEngineDbTable, response: any): void;
  onBeforeLoad?(dbtable: IViewEngineDbTable): Promise<boolean>;
  onAfterLoad?(dbtable: IViewEngineDbTable): void;
  onBeforeClose?(dbtable: IViewEngineDbTable): Promise<boolean>;
  onAfterClose?(dbtable: IViewEngineDbTable): void;
  onChangeGridMode?(dbtable: IViewEngineDbTable, mode: EViewEngineDbTableModes): Promise<boolean>;
  onInputChange?(dbtable: IViewEngineDbTable, event: Event): void;
  onInputFocus?(dbtable: IViewEngineDbTable, event: Event): void;
  onInputBlur?(dbtable: IViewEngineDbTable, event: Event): void;
  onDblClick?(dbtable: IViewEngineDbTable, data: any): void;
}

export interface IViewEngineDbTableInstance extends IViewEngineDbTableHandler {
  new ();
  [VIEW_ENGINE_DBTABLE_NOTATION]: IViewEngineDbTableDecorator;
}
