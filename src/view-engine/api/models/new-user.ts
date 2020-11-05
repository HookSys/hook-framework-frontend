/* tslint:disable */

/**
 * (tsType: Omit<User, 'id'>, schemaOptions: { title: 'NewUser', exclude: [ 'id' ] })
 */
export interface NewUser {
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
