import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgBootstrapModule } from './../ng-bootstrap'

import { SharedRoutingModule } from './shared-routing.module';

import { ApiService } from './services/api.services';

import {
  BrandComponent,
  SpinnerComponent,
  SuccessMessageComponent,
  ErrorMessageComponent,
  MasterComponent,
  DetailsComponent
 } from './layouts';
 import { DecimalEditorComponent, DetailsPickerComponent } from './controls';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    BrandComponent,
    SpinnerComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    MasterComponent,
    DetailsComponent,

    DecimalEditorComponent,
    DetailsPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    HttpClientModule,
    
    FontAwesomeModule,

    NgBootstrapModule,

    SharedRoutingModule
  ],
  exports: [
    HttpClientModule,

    FormsModule,
    NgBootstrapModule,

    BrandComponent,
    SpinnerComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    MasterComponent,
    DetailsComponent,

    DecimalEditorComponent,
    DetailsPickerComponent
  ],
  providers:[ApiService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule { }
