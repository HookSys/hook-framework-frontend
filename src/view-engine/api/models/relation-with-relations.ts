/* tslint:disable */
import { ViewAttributeWithRelations } from './view-attribute-with-relations';

/**
 * (tsType: RelationWithRelations, schemaOptions: { includeRelations: true })
 */
export interface RelationWithRelations {
  createdAt?: string;
  createdBy?: string;
  id: number;
  updatedAt?: string;
  updatedBy?: string;
  viewAttribute?: ViewAttributeWithRelations;
  viewId?: number;
}
