import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MaterialModule } from 'src/app/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantDetailComponent } from './tenant-detail/tenant-detail.component';

export const COMPONENTS = [
    TenantListComponent, TenantDetailComponent,      
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
