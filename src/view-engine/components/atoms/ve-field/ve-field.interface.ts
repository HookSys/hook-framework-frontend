export enum EViewEngineFieldType {
  TEXT,
  NUMBER,
  COMBO,
  RADIO,
  CHECKBOX,
  TEXTAREA
}

export type TViewEngineFieldSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface IViewEngineFieldDomain {
  id: string | number;
  label: string;
}

export interface IViewEngineField {
  id: string;
  name?: string;
  label?: string;
  size: TViewEngineFieldSize;
  line: number;
  position: number;
  sizePercent: number;
  type: EViewEngineFieldType;
  isVisible: boolean;
  isReadOnly: boolean;
  isRequired?: boolean;
  defaultValue: any;
  mask?: string;
  domain?: IViewEngineFieldDomain[]
  desc?: string;
  minLength?: number;
  maxLength?: number;
}
