/* tslint:disable */

/**
 * (tsType: SchematicObjectWithRelations, schemaOptions: { includeRelations: true })
 */
export interface SchematicObjectWithRelations {
  childs?: Array<SchematicObjectWithRelations>;
  createdAt?: string;
  createdBy?: string;
  handlerId: number;
  id?: number;
  type: 'PANEL' | 'DBPANEL' | 'FUNCTION';
  updatedAt?: string;
  updatedBy?: string;
}
