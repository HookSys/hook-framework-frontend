/* tslint:disable */

/**
 * (tsType: PanelWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PanelWithRelations {
  createdAt?: string;
  createdBy?: string;
  description: string;
  id: number;
  size: 'FULL' | 'TWO' | 'THREE';
  updatedAt?: string;
  updatedBy?: string;
}
