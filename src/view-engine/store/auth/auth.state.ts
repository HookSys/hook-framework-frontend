import { Reset } from './../user/user.actions';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthControllerService } from '../../api/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Login, Logout } from './auth.actions';
import { Injectable } from '@angular/core';
import { Me } from '../user/user.actions';

export interface AuthStateModel {
  token: string;
  username: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthControllerService) {}

  @Action(Login)
  getCredentials(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.auth({ body: action.payload}).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username
        });
      }),
      mergeMap(() => ctx.dispatch(new Me()))
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ token: null, username: null });
    ctx.dispatch(new Reset());
  }
}
