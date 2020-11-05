/* tslint:disable */
import { DbPanelWithRelations } from './db-panel-with-relations';
import { ViewWithRelations } from './view-with-relations';

/**
 * (tsType: TableWithRelations, schemaOptions: { includeRelations: true })
 */
export interface TableWithRelations {
  createdAt?: string;
  createdBy?: string;
  dbPanels?: Array<DbPanelWithRelations>;
  description?: string;
  id?: number;
  isActive?: boolean;
  name: string;
  pkField: string;
  updatedAt?: string;
  updatedBy?: string;
  views?: Array<ViewWithRelations>;
}
