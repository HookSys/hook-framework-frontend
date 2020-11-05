/* tslint:disable */

/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<ViewAttribute, 'id'>, 'viewId'>, schemaOptions: { title: 'NewViewAttributeInView', exclude: [ 'id' ], optional: [ 'viewId' ] })
 */
export interface NewViewAttributeInView {
  component: 'TEXT' | 'NUMBER' | 'COMBO' | 'RADIO' | 'CHECKBOX' | 'TEXTAREA' | 'LIST' | 'DATETIME';
  createdAt?: string;
  createdBy?: string;
  defaultValue?: string;
  desc?: string;
  isColumnVisible?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isVisible?: boolean;
  label: string;
  line: number;
  mask?: string;
  name: string;
  position: number;
  relationId?: number;
  size: number;
  sizePercent?: number;
  updatedAt?: string;
  updatedBy?: string;
  viewId?: number;

  [key: string]: any;
}
