/* tslint:disable */

/**
 * (tsType: Omit<Role, 'id'>, schemaOptions: { title: 'NewRole', exclude: [ 'id' ] })
 */
export interface NewRole {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  featureId?: number;
  name?: string;
  policyId?: number;
  updatedAt?: string;
  updatedBy?: string;
}
