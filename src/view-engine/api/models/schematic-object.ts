/* tslint:disable */
export interface SchematicObject {
  createdAt?: string;
  createdBy?: string;
  handlerId: number;
  id?: number;
  type: 'PANEL' | 'DBPANEL' | 'FUNCTION';
  updatedAt?: string;
  updatedBy?: string;
}
