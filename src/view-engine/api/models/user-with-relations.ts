/* tslint:disable */
import { PolicyWithRelations } from './policy-with-relations';
import { UserCredentialsWithRelations } from './user-credentials-with-relations';

/**
 * (tsType: UserWithRelations, schemaOptions: { includeRelations: true })
 */
export interface UserWithRelations {
  cpf: string;
  createdAt?: string;
  createdBy?: string;
  email: string;
  firstname: string;
  id?: number;
  isBlock?: boolean;
  isSuperUser?: boolean;
  lastLogin?: string;
  lastname: string;
  phone?: string;
  policies?: Array<PolicyWithRelations>;
  updatedAt?: string;
  updatedBy?: string;
  userCredentials?: UserCredentialsWithRelations;
  username: string;
}
