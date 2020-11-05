import { Feature } from 'models/feature';

export type FeatureOpenCloseType = Feature | number;

export class OpenFeature {
  public static readonly type = '[Engine] Open Feature';
  constructor(public payload: FeatureOpenCloseType) {}
}

export class CloseFeature {
  public static readonly type = '[Engine] Close Feature';
  constructor(public payload: FeatureOpenCloseType) {}
}

export class SelectFeature {
  public static readonly type = '[Engine] Select Feature';
  constructor(public payload: FeatureOpenCloseType) {}
}
