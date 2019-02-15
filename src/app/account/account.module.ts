import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared';
import { ComponentsModule } from 'src/app/account/components';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,

    SharedModule,

    ComponentsModule,
  ]
})
export class AccountModule { }
