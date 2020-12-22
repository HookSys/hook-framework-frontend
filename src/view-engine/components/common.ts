import { ViewAttribute } from './../api/models/view-attribute';
import { EViewEngineFieldType } from './molecules/ve-form/ve-form.interface';

export function bindPathParams(
  pathParams: object,
  path: string
): string {
  if (!pathParams) {
    return path
  }
  return Object.keys(pathParams).reduce((result, key) => {
    return result.replace(`{${key}}`, pathParams[key])
  }, path)
}

export function getDefaultValueByType(value: any, field: ViewAttribute) {
  if (field.component === EViewEngineFieldType.CHECKBOX) {
    return typeof value === 'string' ? value === 'true' : !!value
  }
  if (field.component === EViewEngineFieldType.NUMBER) {
    return !isNaN(value) ? parseInt(value, 10) : null;
  }
  if (field.component === EViewEngineFieldType.DATETIME) {

  }
  return value ? String(value) : '';
}

export const deleteByPath = (object: Object, path: string) => {
  let currentObject = { ...object }
  const parts = path.split(".")
  const last = parts.pop()
  for (const part of parts) {
    currentObject = currentObject[part]
    if (!currentObject) {
      return
    }
  }
  delete currentObject[last]
}

export class ViewEngineFieldBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  component: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      component?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.component = options.component || '';
    this.options = options.options || [];
  }
}
