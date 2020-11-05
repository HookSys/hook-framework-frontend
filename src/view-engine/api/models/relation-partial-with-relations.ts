/* tslint:disable */
import { ViewAttributePartialWithRelations } from './view-attribute-partial-with-relations';

/**
 * (tsType: Partial<RelationWithRelations>, schemaOptions: { includeRelations: true, partial: 'deep' })
 */
export interface RelationPartialWithRelations {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  updatedAt?: string;
  updatedBy?: string;
  viewAttribute?: ViewAttributePartialWithRelations;
  viewId?: number;
}
