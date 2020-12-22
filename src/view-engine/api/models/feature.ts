import { SchematicsStateModel } from '../../store/engine/schematic/schematic.state';
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
  schematic?: SchematicsStateModel;
  [key: string]: any;
}
