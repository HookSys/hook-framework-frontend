export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  isBlock: boolean,
  isSuperUser: boolean,
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  lastLogin: string;
}
