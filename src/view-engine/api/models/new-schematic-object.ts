/* tslint:disable */

/**
 * (tsType: Omit<SchematicObject, 'id'>, schemaOptions: { title: 'NewSchematicObject', exclude: [ 'id' ] })
 */
export interface NewSchematicObject {
  createdAt?: string;
  createdBy?: string;
  handlerId: number;
  type: 'PANEL' | 'DBPANEL' | 'FUNCTION';
  updatedAt?: string;
  updatedBy?: string;
}
