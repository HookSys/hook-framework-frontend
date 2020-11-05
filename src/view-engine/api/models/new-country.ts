/* tslint:disable */

/**
 * (tsType: Omit<Country, 'id'>, schemaOptions: { title: 'NewCountry', exclude: [ 'id' ] })
 */
export interface NewCountry {
  createdAt?: string;
  createdBy?: string;
  description: string;
  name: string;
  updatedAt?: string;
  updatedBy?: string;
}
