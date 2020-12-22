import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store.config';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthStateModel } from './auth/auth.state';
import { UserWithRelations } from 'view-engine/api/models';
import { EngineStateModel } from './engine';

export type StateModel = {
  auth: AuthStateModel,
  engine: EngineStateModel,
  user: UserWithRelations
};

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
    NgxsStoragePluginModule.forRoot({
      key: ['auth', 'user']
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
  ],
  exports: [NgxsModule]
})
export class NgxsStoreModule {}
