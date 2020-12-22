import { SchematicsState, SchematicsStateModel } from './schematic/schematic.state';
import { AppState, AppStateModel } from './app/app.state';
import { State } from '@ngxs/store';
import { FeaturesState, FeaturesStateModel } from './features/features.state';
import { Injectable } from '@angular/core';

export const EngineStates = [FeaturesState, SchematicsState, AppState];

export type EngineStateModel = {
  features: FeaturesStateModel,
  schematics: SchematicsStateModel,
  app: AppStateModel
};

@State({
  name: 'engine',
  children: EngineStates
})
@Injectable()
export class EngineState {

}
