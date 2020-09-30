import { EViewEngineFieldType, IViewEngineField } from './atoms/ve-field/ve-field.interface';
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
  return value ? String(value) : '';
}
