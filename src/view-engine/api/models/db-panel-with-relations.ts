/* tslint:disable */
import { ViewWithRelations } from './view-with-relations';

/**
 * (tsType: DbPanelWithRelations, schemaOptions: { includeRelations: true })
 */
export interface DbPanelWithRelations {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  name: string;
  tableId?: number;
  title: string;
  updatedAt?: string;
  updatedBy?: string;
  view?: ViewWithRelations;
  viewId?: number;

  [key: string]: any;
}
