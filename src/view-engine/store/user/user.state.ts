import { UserWithRelations, Feature } from '../../api/models';
import { tap } from 'rxjs/operators';
import { AuthControllerService } from '../../api/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Me, Reset } from './user.actions';
import { Injectable } from '@angular/core';

const EMPTY_USER: UserWithRelations = {
  cpf: null,
  email: null,
  firstname: null,
  username: null,
  id: null,
  isBlock: false,
  isSuperUser: false,
  lastname: null,
  phone: null,
  policies: [],
  updatedAt: null,
  updatedBy: null,
  createdAt: null,
  createdBy: null,
  lastLogin: null
};

@State<UserWithRelations>({
  name: 'user',
  defaults: EMPTY_USER
})
@Injectable()
export class UserState {
  constructor(private authService: AuthControllerService) {}

  @Selector()
  static getUser(state: UserWithRelations): UserWithRelations {
    return state;
  }
  @Selector()
  static getFeatures(state: UserWithRelations): Feature[] {
    const { policies } = state
    if (policies.length > 0 && policies[0].features) {
      return policies[0].features.map(
        (f) => ({ ...f, icon: f.icon.toLowerCase() })
      );
    }
  }

  @Action(Me)
  public me(ctx: StateContext<UserWithRelations>) {
    return this.authService.me().pipe(
      tap(user => {
        ctx.patchState(user);
      }),
    )
  }
  @Action(Reset)
  public reset(ctx: StateContext<UserWithRelations>) {
    return ctx.setState(EMPTY_USER);
  }


}
