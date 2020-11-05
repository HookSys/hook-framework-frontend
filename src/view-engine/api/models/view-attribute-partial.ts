/* tslint:disable */

/**
 * (tsType: Partial<ViewAttribute>, schemaOptions: { partial: true })
 */
export interface ViewAttributePartial {
  component?: 'TEXT' | 'NUMBER' | 'COMBO' | 'RADIO' | 'CHECKBOX' | 'TEXTAREA' | 'LIST' | 'DATETIME';
  createdAt?: string;
  createdBy?: string;
  defaultValue?: string;
  desc?: string;
  id?: number;
  isColumnVisible?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isVisible?: boolean;
  label?: string;
  line?: number;
  mask?: string;
  name?: string;
  position?: number;
  relationId?: number;
  size?: number;
  sizePercent?: number;
  updatedAt?: string;
  updatedBy?: string;
  viewId?: number;

  [key: string]: any;
}
