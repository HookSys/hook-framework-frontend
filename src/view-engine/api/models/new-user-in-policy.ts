/* tslint:disable */

/**
 * (tsType: Omit<User, 'id'>, schemaOptions: { title: 'NewUserInPolicy', exclude: [ 'id' ] })
 */
export interface NewUserInPolicy {
  cpf: string;
  createdAt?: string;
  createdBy?: string;
  email: string;
  firstname: string;
  isBlock?: boolean;
  isSuperUser?: boolean;
  lastLogin?: string;
  lastname: string;
  phone?: string;
  updatedAt?: string;
  updatedBy?: string;
  username: string;
}
