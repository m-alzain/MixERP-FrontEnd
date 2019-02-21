import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [AuthCallbackComponent, LogoutCallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),

    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
