/* tslint:disable */
import { PolicyPartialWithRelations } from './policy-partial-with-relations';
import { UserCredentialsPartialWithRelations } from './user-credentials-partial-with-relations';

/**
 * (tsType: Partial<UserWithRelations>, schemaOptions: { includeRelations: true, partial: 'deep' })
 */
export interface UserPartialWithRelations {
  cpf?: string;
  createdAt?: string;
  createdBy?: string;
  email?: string;
  firstname?: string;
  id?: number;
  isBlock?: boolean;
  isSuperUser?: boolean;
  lastLogin?: string;
  lastname?: string;
  phone?: string;
  policies?: Array<PolicyPartialWithRelations>;
  updatedAt?: string;
  updatedBy?: string;
  userCredentials?: UserCredentialsPartialWithRelations;
  username?: string;
}
