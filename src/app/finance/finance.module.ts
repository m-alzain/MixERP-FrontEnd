import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'src/app/finance/reducers';
import { JournalViewEffects } from 'src/app/finance/effects';

import { SharedModule } from './../shared'

import { ComponentsModule } from 'src/app/finance/components';
import { FinanceRoutingModule } from './finance-routing.module';
import { FindJournalViewPageComponent, ViewJournalViewPageComponent } from './containers';

@NgModule({
  declarations: [FindJournalViewPageComponent, ViewJournalViewPageComponent],
  imports: [
    CommonModule,

    SharedModule,

    ComponentsModule,
    FinanceRoutingModule,
    
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('finance', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([JournalViewEffects]),
  ]
})
export class FinanceModule { }
