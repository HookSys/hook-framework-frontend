/* tslint:disable */

/**
 * (tsType: Omit<Table, 'id'>, schemaOptions: { title: 'NewTable', exclude: [ 'id' ] })
 */
export interface NewTable {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  isActive?: boolean;
  name: string;
  pkField: string;
  updatedAt?: string;
  updatedBy?: string;
}
