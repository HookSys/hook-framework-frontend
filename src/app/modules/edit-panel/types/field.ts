import { Domain } from './domain';
import { FieldTypes } from '../enums/field-types';

export interface Field {
  name: string;
  label: string;
  line: number;
  size: number;
  sizePercent?: number;
  position: number;
  type: FieldTypes;
  mask?: string;
  domain?: Domain[];
  required?: boolean;
  minLenght?: number;
  maxLenght?: number;
  readOnly?: boolean;
  visible?: boolean;
  hidden?: boolean;
}
