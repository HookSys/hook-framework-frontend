import { SchematicsState } from './schematic/schematic.state';
import { AppState } from './app/app.state';
import { State } from '@ngxs/store';
import { FeaturesState } from './features/features.state';

export const EngineStates = [FeaturesState, SchematicsState, AppState];

@State({
  name: 'engine',
  children: EngineStates
})
export class EngineState {

}