/* tslint:disable */

/**
 * (tsType: Partial<SchematicObject>, schemaOptions: { partial: true })
 */
export interface SchematicObjectPartial {
  createdAt?: string;
  createdBy?: string;
  handlerId?: number;
  id?: number;
  type?: 'PANEL' | 'DBPANEL' | 'FUNCTION';
  updatedAt?: string;
  updatedBy?: string;
}
