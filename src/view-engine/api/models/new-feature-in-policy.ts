/* tslint:disable */

/**
 * (tsType: Omit<Feature, 'id'>, schemaOptions: { title: 'NewFeatureInPolicy', exclude: [ 'id' ] })
 */
export interface NewFeatureInPolicy {
  code: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  icon: string;
  isActive?: string;
  name: string;
  updatedAt?: string;
  updatedBy?: string;

  [key: string]: any;
}
