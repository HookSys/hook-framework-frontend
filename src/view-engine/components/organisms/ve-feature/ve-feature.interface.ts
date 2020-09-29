import { IViewEngineDbTable } from './../ve-dbtable/ve-dbtable.interface';
import { NgClass } from '@angular/common';
import { ComponentRef } from '@angular/core';
import { BaseModel } from 'src/app/models';
import { ViewEngineFeatureComponent } from './ve-feature.component';
import { VIEW_ENGINE_FEATURE_NOTATION } from './ve-feature.decorator';

export interface IViewEngineFeatureDecorator {
  code: string
}

export interface IViewEngineFeature extends BaseModel {
  id: number;
  name: string;
  icon: string;
  code: string;
  entrypoint: IViewEngineDbTable;
  desc: string;
  isActive: boolean;
}

export interface IViewEngineFeatureEvents {
  onBeforeLoad?(feature: IViewEngineFeature): Promise<boolean>;
  onAfterLoad?(feature: IViewEngineFeature): void;
  onBeforeClose?(feature: IViewEngineFeature): Promise<boolean>;
  onAfterClose?(feature: IViewEngineFeature): void;
}

export interface IViewEngineDbTableEventsInstance extends IViewEngineFeatureEvents {
  new ();
  [VIEW_ENGINE_FEATURE_NOTATION]: IViewEngineFeatureDecorator;
}

export interface IViewEngineFeatureHandler {
  feature: IViewEngineFeature,
  instance: ViewEngineFeatureComponent,
  events?: IViewEngineFeatureEvents,
}
