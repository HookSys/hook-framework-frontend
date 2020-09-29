import { IViewEngineFeatureDecorator } from './ve-feature.interface';

export const VIEW_ENGINE_FEATURE_NOTATION = '__VIEW_ENGINE_FEATURE__';

export function ViewEngineFeature(args: IViewEngineFeatureDecorator): (cls: any) => any {
  return function (target: any) {
    Object.defineProperty(target.prototype, VIEW_ENGINE_FEATURE_NOTATION, {
      value: args
    });
  }
}
