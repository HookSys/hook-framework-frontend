/* tslint:disable */

/**
 * (tsType: Omit<Policy, 'id'>, schemaOptions: { title: 'NewPolicy', exclude: [ 'id' ] })
 */
export interface NewPolicy {
  actions?: Array<string>;
  createdAt?: string;
  createdBy?: string;
  description: string;
  effect?: string;
  name: string;
  updatedAt?: string;
  updatedBy?: string;
}
