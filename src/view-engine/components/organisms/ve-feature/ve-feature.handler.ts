import { ComponentDecorator, ComponentFactory, ComponentRef, Injectable, TypeDecorator } from "@angular/core";
import {
  IViewEngineDbTableEventsInstance,
  IViewEngineFeature,
  IViewEngineFeatureHandler
} from "./ve-feature.interface";
import { VIEW_ENGINE_FEATURE_NOTATION } from "./ve-feature.decorator";
import { ViewEngineFeatureComponent } from './ve-feature.component';

@Injectable()
export class ViewEngineFeatureHandler {
  private features: IViewEngineFeatureHandler[] = [];
  private selectedFeature: IViewEngineFeatureHandler;

  registerEvents(feature: IViewEngineDbTableEventsInstance): void {
    this.features = this.features.map((hFeature) => {
      if (hFeature.feature.code === feature[VIEW_ENGINE_FEATURE_NOTATION].code) {
        return {
          ...hFeature,
          events: feature
        }
      }
      return hFeature
    })
  }

  registerComponent(feature: IViewEngineFeature, cFeature: ViewEngineFeatureComponent): void {
    this.features.push({
      feature,
      instance: cFeature,
    })
  }

  getSelectedFeature(): IViewEngineFeatureHandler {
    return this.selectedFeature
  }

  setSelectedFeature(id: number): void {
    this.selectedFeature = this.features.find((f) => f.feature.id === id)
  }

  unregister(feature: IViewEngineFeature): void {
    this.features = this.features.filter((hFeature) => {
      if (
        hFeature.feature.code !==
        feature.code
      ) {
        return hFeature;
      }
    });
  }
}
