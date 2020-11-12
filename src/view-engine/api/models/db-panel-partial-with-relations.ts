/* tslint:disable */
import { ViewPartialWithRelations } from './view-partial-with-relations';

/**
 * (tsType: Partial<DbPanelWithRelations>, schemaOptions: { includeRelations: true, partial: 'deep' })
 */
export interface DbPanelPartialWithRelations {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  name: string;
  tableId?: number;
  title?: string;
  updatedAt?: string;
  updatedBy?: string;
  view?: ViewPartialWithRelations;
  viewId?: number;

  [key: string]: any;
}
