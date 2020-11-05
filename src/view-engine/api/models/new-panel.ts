/* tslint:disable */

/**
 * (tsType: Omit<Panel, 'id'>, schemaOptions: { title: 'NewPanel', exclude: [ 'id' ] })
 */
export interface NewPanel {
  createdAt?: string;
  createdBy?: string;
  description: string;
  size: 'FULL' | 'TWO' | 'THREE';
  updatedAt?: string;
  updatedBy?: string;
}
