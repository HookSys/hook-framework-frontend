/* tslint:disable */
import { FeaturePartialWithRelations } from './feature-partial-with-relations';
import { UserPartialWithRelations } from './user-partial-with-relations';

/**
 * (tsType: Partial<PolicyWithRelations>, schemaOptions: { includeRelations: true, partial: 'deep' })
 */
export interface PolicyPartialWithRelations {
  actions?: Array<string>;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  effect?: string;
  features?: Array<FeaturePartialWithRelations>;
  id?: number;
  name?: string;
  updatedAt?: string;
  updatedBy?: string;
  users?: Array<UserPartialWithRelations>;
}
