export enum EViewEngineFieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  COMBO = 'COMBO',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  TEXTAREA = 'TEXTAREA',
  LIST = 'LIST',
  DATETIME = 'DATETIME'
}

export type TViewEngineFieldSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface IViewEngineFieldDomainOption {
  id: string | number;
  value: string;
}
export interface IViewEngineFieldDomain {
  id: number;
  name: string;
  desc: string;
  options: IViewEngineFieldDomainOption[];
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
  isColumnVisible: boolean;
  mask?: string;
  domainId?: number;
  domain?: IViewEngineFieldDomain;
  desc?: string;
  minLength?: number;
  maxLength?: number;
}
