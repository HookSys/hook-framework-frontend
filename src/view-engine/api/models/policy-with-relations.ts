/* tslint:disable */
import { FeatureWithRelations } from './feature-with-relations';
import { UserWithRelations } from './user-with-relations';

/**
 * (tsType: PolicyWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PolicyWithRelations {
  actions?: Array<string>;
  createdAt?: string;
  createdBy?: string;
  description: string;
  effect?: string;
  features?: Array<FeatureWithRelations>;
  id?: number;
  name: string;
  updatedAt?: string;
  updatedBy?: string;
  users?: Array<UserWithRelations>;
}
