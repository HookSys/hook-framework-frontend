/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthControllerService } from './services/auth-controller.service';
import { CountryControllerService } from './services/country-controller.service';
import { DbPanelControllerService } from './services/db-panel-controller.service';
import { ExpressionControllerService } from './services/expression-controller.service';
import { FeatureControllerService } from './services/feature-controller.service';
import { PanelControllerService } from './services/panel-controller.service';
import { PolicyControllerService } from './services/policy-controller.service';
import { PolicyFeatureControllerService } from './services/policy-feature-controller.service';
import { PolicyUserControllerService } from './services/policy-user-controller.service';
import { RoleControllerService } from './services/role-controller.service';
import { SchematicObjectControllerService } from './services/schematic-object-controller.service';
import { TableControllerService } from './services/table-controller.service';
import { TableViewControllerService } from './services/table-view-controller.service';
import { UserControllerService } from './services/user-controller.service';
import { ViewAttributeControllerService } from './services/view-attribute-controller.service';
import { ViewControllerService } from './services/view-controller.service';
import { ViewAttributesControllerService } from './services/view-attributes-controller.service';
import { WorkGroupControllerService } from './services/work-group-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthControllerService,
    CountryControllerService,
    DbPanelControllerService,
    ExpressionControllerService,
    FeatureControllerService,
    PanelControllerService,
    PolicyControllerService,
    PolicyFeatureControllerService,
    PolicyUserControllerService,
    RoleControllerService,
    SchematicObjectControllerService,
    TableControllerService,
    TableViewControllerService,
    UserControllerService,
    ViewAttributeControllerService,
    ViewControllerService,
    ViewAttributesControllerService,
    WorkGroupControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
