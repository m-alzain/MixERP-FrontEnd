import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared';
import { ComponentsModule } from 'src/app/account/components';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SharedModule,

    ComponentsModule,
  ]
})
export class DashboardModule { }
