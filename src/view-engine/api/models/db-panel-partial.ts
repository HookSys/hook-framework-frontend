/* tslint:disable */

/**
 * (tsType: Partial<DbPanel>, schemaOptions: { partial: true })
 */
export interface DbPanelPartial {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  name?: string;
  tableId?: number;
  title?: string;
  updatedAt?: string;
  updatedBy?: string;
  viewId?: number;

  [key: string]: any;
}
