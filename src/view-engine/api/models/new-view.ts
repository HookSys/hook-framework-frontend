/* tslint:disable */

/**
 * (tsType: Omit<View, 'id'>, schemaOptions: { title: 'NewView', exclude: [ 'id' ] })
 */
export interface NewView {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  isActive?: boolean;
  name: string;
  tableId?: number;
  updatedAt?: string;
  updatedBy?: string;
}
