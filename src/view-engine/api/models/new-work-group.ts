/* tslint:disable */

/**
 * (tsType: Omit<WorkGroup, 'id'>, schemaOptions: { title: 'NewWorkGroup', exclude: [ 'id' ] })
 */
export interface NewWorkGroup {
  createdAt?: string;
  createdBy?: string;
  description?: string;
  name?: string;
  policyId?: number;
  updatedAt?: string;
  updatedBy?: string;
  userId?: number;
}
