import { SchematicObject } from 'models/schematic-object';
import { SchematicObjectWithRelations } from 'view-engine/api/models';

export class  CreateSchematic {
  public static readonly type = '[Schematics] Creating schematic';
  constructor(public payload: SchematicObjectWithRelations) {}
}

export class  AppendSchematic {
  public static readonly type = '[Schematics] Appending object';
  constructor(public parent: number, public type: string, public payload: SchematicObjectWithRelations) {}
}
