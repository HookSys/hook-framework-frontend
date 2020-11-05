/* tslint:disable */
export interface DbPanel {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  name: string;
  tableId?: number;
  title: string;
  updatedAt?: string;
  updatedBy?: string;
  viewId?: number;

  [key: string]: any;
}
