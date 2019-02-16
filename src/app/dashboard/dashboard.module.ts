import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ComponentsModule } from './components';

import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/dashboard/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TenantEffects } from './effects/tenant.effects';
import { FindTenantPageComponent } from './containers/find-tenant-page.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    FindTenantPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    ComponentsModule,

    SharedModule,
    
    StoreModule.forFeature('dashboard', reducers),

    EffectsModule.forFeature([TenantEffects]),
  ]
})
export class DashboardModule { }
