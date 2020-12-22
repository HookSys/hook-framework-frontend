import { FeaturesState } from './../features/features.state';
import { EngineStateModel } from "./../index";
import { CloseFeature, OpenFeature, SelectFeature } from "./../features/features.actions";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { CreateSchematic, AppendSchematic, DestroySchematic } from "./schematic.actions";
import { Injectable } from "@angular/core";
import { SchematicObjectWithRelations } from "view-engine/api/models";

export type SchematicStateModel = {
  lastUid: number;
  featureId: number;
  root: SchematicObjectWithRelations;
};

export type SchematicsStateModel = {
  selectedInx: number;
  roots: SchematicStateModel[];
};

const defaults = {
  selectedInx: null,
  roots: ([] as SchematicStateModel[])
};

@State<SchematicsStateModel>({
  name: "schematics",
  defaults,
})
@Injectable()
export class SchematicsState {
  constructor(
    public store: Store
  ) {
  }
  @Selector()
  static getLastUid(state: SchematicsStateModel): Number {
    return state.roots[state.selectedInx].lastUid;
  }

  @Selector()
  static getSchematic(id: number,) {
    return function ({
      engine
    }: {
      engine: EngineStateModel;
    }): SchematicObjectWithRelations {
      const { schematics } = engine;
      const { selectedInx, roots } = schematics;

      if (typeof selectedInx === 'number' && selectedInx >= 0) {
        const node = SchematicsState.find(roots[selectedInx].root, id,  "root", true);
        return typeof node !== 'string' ? node : roots[selectedInx].root;
      }
      return null;
    };
  }

  @Action(OpenFeature)
  public openFeature(
    ctx: StateContext<SchematicsStateModel>,
    { payload }: OpenFeature
  ) {
    const featureId = typeof payload === 'number' ? payload : payload.id;
    const { roots } = ctx.getState()
    const exists = roots.findIndex((r) => r.featureId === featureId);
    if (exists >= 0) {
      ctx.patchState({
        selectedInx: exists
      });
    } else {
      ctx.patchState({
        selectedInx: roots.length,
        roots: [].concat(roots, [{
          lastUid: -1,
          featureId,
          root: { },
        }])
      });
    }
  }

  // @Action(CreateSchematic)
  // public create(
  //   ctx: StateContext<SchematicsStateModel>,
  //   { payload }: CreateSchematic
  // ) {
  //   const selected = this.store.selectSnapshot(FeaturesState.getSelected)
  //   const { roots } = ctx.getState()
  //   const exists = roots.findIndex((r) => r.featureId === selected.id);
  //   if (exists >= 0) {
  //     ctx.patchState({
  //       selectedInx: exists
  //     });
  //   } else {
  //     ctx.patchState({
  //       selectedInx: roots.length,
  //       roots: [].concat(roots, [{
  //         lastUid: payload.id,
  //         featureId: selected.id,
  //         root: { ...payload },
  //       }])
  //     });
  //   }
  // }


  @Action(CloseFeature)
  public destroy( ctx: StateContext<SchematicsStateModel>, { payload }: CloseFeature ) {
    const { roots } = ctx.getState();
    const featureId = typeof payload === 'number' ? payload : payload.id;
    const rootId = roots.findIndex((r) => r.featureId === featureId);
    ctx.patchState({
      selectedInx: rootId > 0 ?  rootId - 1 : - 1,
      roots: roots.filter((r) => r.featureId !== featureId),
    });
  }

  @Action(SelectFeature)
  public selectFeature(
    ctx: StateContext<SchematicsStateModel>,
    { payload }: SelectFeature
  ) {
    const { roots } = ctx.getState();
    const featureId = typeof payload === 'number' ? payload : payload.id;
    ctx.patchState({
      selectedInx: roots.findIndex((r) => r.featureId === featureId),
    });
  }

  @Action(AppendSchematic)
  public append(
    ctx: StateContext<SchematicsStateModel>,
    { parent, type, payload }: AppendSchematic
  ) {
    const stateMain = ctx.getState();
    const state = stateMain.roots[stateMain.selectedInx];
    const selected = this.store.selectSnapshot(FeaturesState.getSelected)

    if (selected.id !== state.featureId) return;

    const newState: SchematicStateModel = {
      ...state,
      root: { ...state.root },
    };
    const node = SchematicsState.find(newState.root, type === 'PANEL' ? payload.id : parent );
    try {
      if (type === 'PANEL' && node === null) {
        newState.root = { ...payload };
      } else {
        const nodeSchematic = {
          ...eval(`newState.${node}`),
        } as SchematicObjectWithRelations;
        if (nodeSchematic && nodeSchematic.id === parent) {
          if (nodeSchematic.childs && nodeSchematic.childs.findIndex((c) => c.id === payload.id) < 0) {
            eval(`newState.${node}`).childs = [].concat(
              eval(`newState.${node}`).childs,
              { ...payload }
            );
          }
        }
      }

      ctx.patchState({
        roots: stateMain.roots.map((r, i) => {
          if (i === stateMain.selectedInx) {
            return {
              ...state,
              root: newState.root,
              lastUid: payload.id,
            }
          }
          return r;
        })
      })
    } catch (e) {
      console.debug(e);
    }
  }


  static find(
    node: SchematicObjectWithRelations,
    parent: number,
    path: string = "root",
    objReturn: boolean = false,
    inx = 0
  ): string | SchematicObjectWithRelations {
    let found: boolean = false;
    while (!found) {
      if (node.id === parent) {
        found = true;
        return objReturn ? node : `${path}`;
      } else if (node.childs && Array.isArray(node.childs)) {
        for (let i = 0, ii = node.childs.length; i < ii; i++) {
          const found = SchematicsState.find(
            node.childs[i],
            parent,
            path,
            objReturn,
            inx + 1
          );
          if (found) {
            return objReturn ? node :  `${path}.childs[${inx}]`;
          }
        }
      }
      return null;
    }
  }
}
