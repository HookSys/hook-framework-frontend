import { State } from '@ngxs/store';
import { FeaturesState } from './features/features.state';

export const EngineStates = [FeaturesState];

@State({
  name: 'engine',
  children: EngineStates
})
export class EngineState {

}
