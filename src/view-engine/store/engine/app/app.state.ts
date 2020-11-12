import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StartLoading, CloseLoading } from "./app.actions";
import { Injectable } from "@angular/core";

export type AppStateModel = {
  isLoading: boolean;
};

@State<AppStateModel>({
  name: "app",
  defaults: {
    isLoading: false,
  },
})
@Injectable()
export class AppState {
  constructor() {}
  @Selector()
  static isLoading(state: AppStateModel): boolean {
    return state.isLoading;
  }

  @Action(StartLoading)
  public startLoading(ctx: StateContext<AppStateModel>) {
    return ctx.patchState({
      isLoading: true,
    });
  }

  @Action(CloseLoading)
  public closeLoading(ctx: StateContext<AppStateModel>) {
    return ctx.patchState({
      isLoading: false,
    });
  }
}
