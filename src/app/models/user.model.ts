import { BaseModel } from './base.model';
import { Policy } from './policy.model';

export interface User extends BaseModel {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  isBlock: boolean,
  isSuperUser: boolean,
  lastLogin: string;
  policies?: Omit<Policy, 'users'>[];
}
