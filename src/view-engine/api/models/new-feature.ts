/* tslint:disable */

/**
 * (tsType: Omit<Feature, 'id'>, schemaOptions: { title: 'NewFeature', exclude: [ 'id' ] })
 */
export interface NewFeature {
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
