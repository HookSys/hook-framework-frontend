import { ViewEngineSchematicsPanelComponent } from './components/organisms/ve-schematics/factories/ve-schematic-ve-panel.factory';
import { ViewEngineSchematicsHostDirective } from './components/organisms/ve-schematics/ve-schematics.directive';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

import { ViewEngineComponent } from './engine/engine.component';
import { ViewEngineGridComponent } from './components/molecules/ve-grid/ve-grid.component';
import { ViewEngineDbTableComponent } from './components/organisms/ve-dbtable/ve-dbtable.component';
import { IViewEngineDbTableInstance } from './components/organisms/ve-dbtable/ve-dbtable.interface';
import { ViewEngineDbTableHandler } from './components/organisms/ve-dbtable/ve-dbtable.handler';
import { ViewEngineFormComponent } from './components/molecules/ve-form/ve-form.component';
import { ViewEngineDbTableService } from './components/organisms/ve-dbtable/ve-dbtable.service';
import { ViewEngineLoaderComponent } from './components/atoms/ve-loader/ve-loader.component';
import { ViewEnginePanelComponent } from './components/molecules/ve-panel/ve-panel.component';
import { ViewEngineTextArea } from './components/atoms/ve-text-area/ve-text-area.component';
import { ViewEngineDatePicker } from './components/atoms/ve-datepicker/ve-datepicker.component';
import { ViewEngineCheckbox } from './components/atoms/ve-checkbox/ve-checkbox.component';
import { ViewEngineRadioButton } from './components/atoms/ve-radio-button/ve-radio-button.component';
import { ViewEngineSelect } from './components/atoms/ve-select/ve-select.component';
import { ViewEngineTextInput } from './components/atoms/ve-text-input/ve-text-input.component';
import { ViewEngineFeatureHandler } from './components/organisms/ve-feature/ve-feature.handler';
import { ViewEngineFeatureComponent } from './components/organisms/ve-feature/ve-feature.component';
import { ViewEngineListBox } from './components/atoms/ve-listbox/ve-listbox.component';
import { ViewEnginePanelDirective } from './components/molecules/ve-panel/ve-panel.directive';
import { ViewEngineSchematicsComponent } from './components/organisms/ve-schematics/ve-schematics.component';

import {NgxsStoreModule} from './store';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    ViewEngineComponent,
    ViewEngineDbTableComponent,
    ViewEngineFormComponent,
    ViewEngineGridComponent,
    ViewEngineLoaderComponent,
    ViewEngineFeatureComponent,
    ViewEnginePanelComponent,
    ViewEngineTextInput,
    ViewEngineSelect,
    ViewEngineTextArea,
    ViewEngineRadioButton,
    ViewEngineDatePicker,
    ViewEngineCheckbox,
    ViewEngineListBox,
    ViewEngineSchematicsComponent,
    ViewEnginePanelDirective,
    ViewEngineSchematicsPanelComponent,
    ViewEngineSchematicsHostDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({}),
    NgbModule,
    ListBoxModule,
    NgxsStoreModule,
    ApiModule
  ],
  providers: [
    ViewEngineDbTableHandler,
    ViewEngineDbTableService,
    ViewEngineFeatureHandler,
  ],
  exports: [
    ViewEngineComponent,
    ViewEngineDbTableComponent,
    ViewEngineFormComponent,
    ViewEngineGridComponent,
    ViewEngineLoaderComponent,
    ViewEngineFeatureComponent,
    ViewEnginePanelComponent,
  ],
  entryComponents: [
    ViewEngineSchematicsPanelComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ViewEngineModule {
}
