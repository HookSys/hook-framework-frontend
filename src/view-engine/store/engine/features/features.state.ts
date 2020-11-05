import { FilterBuilder } from './../../../api/query';
import { FeatureControllerService } from "./../../../api/services/feature-controller.service";
import { Feature } from "models/feature";
import { tap } from "rxjs/operators";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { OpenFeature, CloseFeature, SelectFeature } from "./features.actions";
import { Injectable } from "@angular/core";

export type FeatureWithStatus = Feature & { selected: boolean };
export interface FeaturesStateModel {
  features: Array<FeatureWithStatus>;
}

const filter = new FilterBuilder<Feature>({
  include: [{
    relation: 'schematicObject',
    scope: {
      where: { type: 'FUNCTION' },
      include: [{
        relation: 'childs'
      }]
    }
  }]
}).build();

@State<FeaturesStateModel>({
  name: "features",
  defaults: {
    features: [],
  },
})
@Injectable()
export class FeaturesState {
  constructor(private featureService: FeatureControllerService) {}
  @Selector()
  static getSelected(state: FeaturesStateModel): Feature {
    const { features } = state;
    const inx = features.findIndex((feat) => feat.selected);
    return inx >= 0 && features[inx];
  }

  @Selector()
  static getFeatures(state: FeaturesStateModel): Feature[] {
    const { features } = state;
    return features;
  }

  @Selector()
  static hasFeatureOpened(state: FeaturesStateModel): boolean {
    const { features } = state;
    return features.length > 0;
  }

  @Action(OpenFeature)
  public openFeature(
    ctx: StateContext<FeaturesStateModel>,
    { payload }: OpenFeature
  ) {
    const features = this.unselectAllFeatures(ctx.getState());
    const exists = (id: number) =>
      ctx.getState().features.findIndex((f) => f.id === id) >= 0;
    if (typeof payload === "number") {
      if (exists(payload)) return;
      return this.featureService.findById({ id: payload, filter }).pipe(
        tap((feature) => {
          ctx.patchState({
            features: [].concat(features, this.getAsSelectedFeature(feature)),
          });
        })
      );
    } else {
      if (exists(payload.id)) return;
      return ctx.patchState({
        features: [].concat(features, this.getAsSelectedFeature(payload)),
      });
    }
  }
  @Action(CloseFeature)
  public closeFeature(
    ctx: StateContext<FeaturesStateModel>,
    { payload }: CloseFeature
  ) {
    const { features } = ctx.getState();
    const select = (f: FeatureWithStatus) =>
      features.length > 1 &&
      setTimeout(() =>
        ctx.dispatch(new SelectFeature(f ? f.id : features[1].id))
      );
    if (typeof payload === "number") {
      ctx.patchState({
        features: features.filter(
          (f, i, ar) => f.id !== payload || void select(ar[i - 1])
        ),
      });
    } else {
      ctx.patchState({
        features: features.filter(
          (f, i, ar) => f.id !== payload.id || void select(ar[i - 1])
        ),
      });
    }
  }
  @Action(SelectFeature)
  public selectFeature(
    ctx: StateContext<FeaturesStateModel>,
    { payload }: SelectFeature
  ) {
    const selected = FeaturesState.getSelected(ctx.getState());
    const features = this.unselectAllFeatures(ctx.getState());
    if (typeof payload === "number") {
      if (selected.id === payload) return;
      ctx.patchState({
        features: features.map((feat) =>
          feat.id === payload ? this.getAsSelectedFeature(feat) : feat
        ),
      });
    } else {
      if (selected.id === payload.id) return;
      ctx.patchState({
        features: features.map((feat) =>
          feat.id === payload.id ? this.getAsSelectedFeature(feat) : feat
        ),
      });
    }
  }

  getAsSelectedFeature(feature: Feature): FeatureWithStatus {
    return { ...feature, selected: true };
  }

  unselectAllFeatures(state: FeaturesStateModel): FeatureWithStatus[] {
    if (state && state.features) {
      return state.features.map((feat) => ({ ...feat, selected: false }));
    }
    return [];
  }
}
