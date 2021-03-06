import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';
import { DashboardComponent } from './dashboard/dashboard.component';


export const COMPONENTS = [
    DashboardComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    
    FontAwesomeModule,

    SharedModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}