import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared';
import { ComponentsModule } from 'src/app/account/components';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';


@NgModule({
  declarations: [DashboardComponent, DashboardContainerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SharedModule,

    ComponentsModule,
  ]
})
export class DashboardModule { }
