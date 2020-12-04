import { OpenFeature } from './../features/features.actions';
import { Action, Selector, State, StateContext,  } from "@ngxs/store";
import { CreateSchematic, AppendSchematic } from "./schematic.actions";
import { Injectable } from "@angular/core";
import { SchematicObjectWithRelations } from 'view-engine/api/models';

export type SchematicsStateModel = {
  lastUid: number;
  root: SchematicObjectWithRelations;
};

@State<SchematicsStateModel>({
  name: "schematics",
  defaults: {
    lastUid: 0,
    root: ({} as SchematicObjectWithRelations)
  },
})
@Injectable()
export class SchematicsState {
  constructor() {}
  @Selector()
  static getLastUid(state: SchematicsStateModel): Number {
    return state.lastUid;
  }

  @Action(OpenFeature)
  public openFeature(ctx: StateContext<SchematicsStateModel>, { payload }: OpenFeature) {
    console.log(payload)
  }

  @Action(CreateSchematic)
  public create(ctx: StateContext<SchematicsStateModel>, { payload }: CreateSchematic) {
    ctx.patchState({
      lastUid: payload.id,
      root: { ...payload }
    });
  }

  @Action(AppendSchematic)
  public append(ctx: StateContext<SchematicsStateModel>, { parent, type, payload }: AppendSchematic) {
    const state = ctx.getState();
    const newState: SchematicsStateModel = { ...state, root: { ...state.root} };
    const node = this.find(newState.root, parent, type);

    try {
      const nodeSchematic = eval(`state.${node}`) as SchematicObjectWithRelations;
      if (nodeSchematic && ((nodeSchematic.id !== parent && nodeSchematic.type !== type))) {
        if (nodeSchematic.childs && Array.isArray(nodeSchematic.childs)) {
          nodeSchematic.childs.push(payload);
        } else {
          nodeSchematic.childs = [payload];
        }
        ctx.patchState({
          root: newState.root,
          lastUid: nodeSchematic.id,
        })
      }
    } catch {
      console.log(node);
    }
  }

  private find(node: SchematicObjectWithRelations, parent: number, type: string, path: string = 'root', inx = 0): string {
    let found: boolean = false;
    while (!found) {
      if (node.id === parent) {
        found = true;
        return `${path}`;
      } else if (node.childs && Array.isArray(node.childs)) {
        for (let i = 0, ii = node.childs.length; i < ii; i++) {
          const found = this.find(node.childs[i], parent, type, path, inx + 1);
          if (found) {
            return `${path}.childs[${inx}]`;
          }
        }
      }
      return null;
    }
  }

}
