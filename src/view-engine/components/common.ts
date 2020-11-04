import { EViewEngineFieldType, IViewEngineField } from './molecules/ve-form/ve-form.interface';
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

export function getDefaultValueByType(value: any, field: IViewEngineField) {
  if (field.type === EViewEngineFieldType.CHECKBOX) {
    return Boolean(value)
  }
  if (field.type === EViewEngineFieldType.NUMBER) {
    return !isNaN(value) ? parseInt(value, 10) : null;
  }
  if (field.type === EViewEngineFieldType.DATETIME) {

  }
  return value ? String(value) : '';
}

export class ViewEngineFieldBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
