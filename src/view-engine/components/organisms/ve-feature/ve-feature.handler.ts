import { Injectable } from "@angular/core";
import {
  IViewEngineDbTableEventsInstance,
  IViewEngineFeature,
  IViewEngineFeatureHandler
} from "./ve-feature.interface";
import { VIEW_ENGINE_FEATURE_NOTATION } from "./ve-feature.decorator";
import { ViewEngineFeatureComponent } from './ve-feature.component';

@Injectable({
  providedIn:'root'
})
export class ViewEngineFeatureHandler {
  private features: IViewEngineFeatureHandler[] = [];

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
    return this.features.find((f) => f.isVisible)
  }

  setSelectedFeature(id: number): void {
    this.features = this.features.map((f) => {
      if (f.feature.id === id) {
        return {
          ...f,
          isVisible: true
        }
      }
      return {
        ...f,
        isVisible: false
      }
    })
  }

  getFeatures() {
    return this.features;
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
