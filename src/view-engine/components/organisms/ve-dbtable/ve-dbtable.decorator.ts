import { IViewEngineDbTableDecorator } from './ve-dbtable.interface';

export const VIEW_ENGINE_DBTABLE_NOTATION = '__VIEW_ENGINE_DBTABLE__';

export function ViewEngineDbTable(args: IViewEngineDbTableDecorator): (cls: any) => any {
  return function (target: any) {
    Object.defineProperty(target.prototype, VIEW_ENGINE_DBTABLE_NOTATION, {
      value: args
    });
  }
}
