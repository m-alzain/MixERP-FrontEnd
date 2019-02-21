import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import { ComponentsModule } from './components';

import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/account/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TenantEffects } from './effects/tenant.effects';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,

    ComponentsModule,

    SharedModule,
    
    StoreModule.forFeature('account', reducers),

    EffectsModule.forFeature([TenantEffects]),
  ]
})
export class AccountModule { }
