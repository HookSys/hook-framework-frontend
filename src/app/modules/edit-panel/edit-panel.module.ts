import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicGridComponent } from './components/dynamic-grid/dynamic-grid.component';
import { EditPanelComponent } from './edit-panel.component';

import { EditPanelService } from './services/edit-panel.service';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicGridComponent,
    EditPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({})
  ],
  providers: [
    EditPanelService
  ],
  entryComponents: [
    EditPanelComponent
  ],
  exports: [
    EditPanelComponent,
    DynamicFormComponent,
    DynamicGridComponent
  ]
})
export class EditPanelModule { }
