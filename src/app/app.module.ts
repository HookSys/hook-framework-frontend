import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewEngineModule } from '../view-engine/view-engine.module';

import { AppComponent } from './app.component';

import { MainPageComponent } from './pages/main/main-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';

import * as ViewEngineForms from './forms';
import { AppInterceptor } from './app.interceptor';
import { AuthService } from './services/auth.service';
import { EditPanelModule } from './modules/edit-panel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { ApplicationStore } from './store/application.store';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    EditPanelModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot({}),
    ViewEngineModule.forRoot(ViewEngineForms),
  ],
  providers: [
    AuthService,
    StorageService,
    ApplicationStore,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
