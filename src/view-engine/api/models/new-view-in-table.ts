/* tslint:disable */

/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<View, 'id'>, 'tableId'>, schemaOptions: { title: 'NewViewInTable', exclude: [ 'id' ], optional: [ 'tableId' ] })
 */
export interface NewViewInTable {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  isActive?: boolean;
  name: string;
  tableId?: number;
  updatedAt?: string;
  updatedBy?: string;
}
