import { ViewEngineFeatureHandler } from './components/organisms/ve-feature/ve-feature.handler';
import { ViewEngineFeatureComponent } from './components/organisms/ve-feature/ve-feature.component';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ViewEngineComponent } from './engine/engine.component';
import { ViewEngineGridComponent } from './components/molecules/ve-grid/ve-grid.component';
import { ViewEngineDbTableComponent } from './components/organisms/ve-dbtable/ve-dbtable.component';
import { IViewEngineDbTableInstance } from './components/organisms/ve-dbtable/ve-dbtable.interface';
import { ViewEngineDbTableHandler } from './components/organisms/ve-dbtable/ve-dbtable.handler';
import { ViewEngineFormComponent } from './components/molecules/ve-form/ve-form.component';
import { ViewEngineDbTableService } from './components/organisms/ve-dbtable/ve-dbtable.service';
import { ViewEngineFieldComponent } from './components/atoms/ve-field/ve-field.component';
import { ViewEngineLoaderComponent } from './components/atoms/loader/ve-loader.component';
import { ViewEnginePanelComponent } from './components/molecules/ve-panel/ve-panel.component';
import { ViewEngineFeatureService } from './components/organisms/ve-feature/ve-feature.service';

function InitViewEngine(forms: any = {}) {
  return function (formsService: ViewEngineDbTableHandler) {
    return () => {
      return new Promise((resolve) => {
        const formKeys = Object.keys(forms)
        formKeys.forEach((key: string, inx) => {
          if (key !== 'default') {
            const Form = forms[key] as IViewEngineDbTableInstance
            formsService.register(Form)
          }
          if (inx === formKeys.length - 1) {
            resolve()
          }
        })
      });
    };
  }
}

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    ViewEngineComponent,
    ViewEngineDbTableComponent,
    ViewEngineFormComponent,
    ViewEngineGridComponent,
    ViewEngineFieldComponent,
    ViewEngineLoaderComponent,
    ViewEngineFeatureComponent,
    ViewEnginePanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({}),
  ],
  providers: [
    ViewEngineDbTableHandler,
    ViewEngineDbTableService,
    ViewEngineFeatureHandler,
    ViewEngineFeatureService
  ],
  exports: [
    ViewEngineComponent,
    ViewEngineDbTableComponent,
    ViewEngineFormComponent,
    ViewEngineGridComponent,
    ViewEngineFieldComponent,
    ViewEngineLoaderComponent,
    ViewEngineFeatureComponent,
    ViewEnginePanelComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ViewEngineModule {
  static forRoot(forms: any = {}): ModuleWithProviders{
    return {
      ngModule: ViewEngineModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: InitViewEngine(forms),
          multi: true,
          deps: [ViewEngineDbTableHandler],
        },
      ]
    }
  }
}
