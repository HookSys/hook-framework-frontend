import { SchematicObjectWithRelations } from 'models/schematic-object-with-relations';
/* tslint:disable */
export interface Feature {
  code: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  icon: string;
  id?: number;
  isActive?: string;
  name: string;
  updatedAt?: string;
  updatedBy?: string;
  schematicObject?: SchematicObjectWithRelations;
  [key: string]: any;
}
