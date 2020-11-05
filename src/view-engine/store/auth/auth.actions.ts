export type GetCredentialsPayload = { 'username': string, 'password': string };

export class Login {
  public static readonly type = '[Auth] Login';
  constructor(public payload: GetCredentialsPayload) {}
}

export class Logout {
  public static readonly type = '[Auth] Session';
}
