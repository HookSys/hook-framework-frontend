/* tslint:disable */
import { DbPanelPartialWithRelations } from './db-panel-partial-with-relations';
import { RelationPartialWithRelations } from './relation-partial-with-relations';
import { ViewAttributePartialWithRelations } from './view-attribute-partial-with-relations';

/**
 * (tsType: Partial<ViewWithRelations>, schemaOptions: { includeRelations: true, partial: 'deep' })
 */
export interface ViewPartialWithRelations {
  attributes?: Array<ViewAttributePartialWithRelations>;
  createdAt?: string;
  createdBy?: string;
  dbPanels?: Array<DbPanelPartialWithRelations>;
  description?: string;
  id?: number;
  isActive?: boolean;
  name?: string;
  relations?: Array<RelationPartialWithRelations>;
  tableId?: number;
  updatedAt?: string;
  updatedBy?: string;
}
