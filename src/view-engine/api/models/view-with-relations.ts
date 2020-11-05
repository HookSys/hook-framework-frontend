/* tslint:disable */
import { DbPanelWithRelations } from './db-panel-with-relations';
import { RelationWithRelations } from './relation-with-relations';
import { ViewAttributeWithRelations } from './view-attribute-with-relations';

/**
 * (tsType: ViewWithRelations, schemaOptions: { includeRelations: true })
 */
export interface ViewWithRelations {
  attributes?: Array<ViewAttributeWithRelations>;
  createdAt?: string;
  createdBy?: string;
  dbPanels?: Array<DbPanelWithRelations>;
  description?: string;
  id?: number;
  isActive?: boolean;
  name: string;
  relations?: Array<RelationWithRelations>;
  tableId?: number;
  updatedAt?: string;
  updatedBy?: string;
}
