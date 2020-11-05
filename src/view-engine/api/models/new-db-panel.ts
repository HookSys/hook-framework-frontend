/* tslint:disable */

/**
 * (tsType: Omit<DbPanel, 'id'>, schemaOptions: { title: 'NewDbPanel', exclude: [ 'id' ] })
 */
export interface NewDbPanel {
  createdAt?: string;
  createdBy?: string;
  name: string;
  tableId?: number;
  title: string;
  updatedAt?: string;
  updatedBy?: string;
  viewId?: number;

  [key: string]: any;
}
