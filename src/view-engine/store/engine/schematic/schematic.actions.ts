import { SchematicObjectWithRelations } from 'view-engine/api/models';

export class  CreateSchematic {
  public static readonly type = '[Schematics] Creating schematic';
  constructor(public payload: SchematicObjectWithRelations) {}
}

export class  DestroySchematic {
  public static readonly type = '[Schematics] Erasing schematic';
  constructor(public payload: SchematicObjectWithRelations) {}
}

export class  AppendSchematic {
  public static readonly type = '[Schematics] Appending object';
  constructor(public parent: number, public type: 'PANEL' | 'DBPANEL' | 'FUNCTION', public payload: SchematicObjectWithRelations) {}
}
