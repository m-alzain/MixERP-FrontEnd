import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MaterialModule } from '../material';
import { CanDeactivateGuard } from './services/can-deactivate.guard';

@NgModule({
  declarations: [
    BrandComponent,
    SpinnerComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    MasterComponent,
    DetailsComponent,

    DecimalEditorComponent,
    DetailsPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    
    FontAwesomeModule,

    NgBootstrapModule,

    SharedRoutingModule,
    MaterialModule,
  ],
  exports: [
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule,

    BrandComponent,
    SpinnerComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    MasterComponent,
    DetailsComponent,

    DecimalEditorComponent,
    DetailsPickerComponent,

  ],
  providers:[ApiService, CanDeactivateGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule { }
