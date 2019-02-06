import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationTriangle,
  faSpinner,
  faSignInAlt,
  faSignOutAlt,
  faKey,
  faCheck,
  faPlus,
  faSyncAlt,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faThLarge,
  faList,
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
  faDownload,
  faArrowCircleRight,
  faThumbsUp,
  faThumbsDown,
  faUndo,
  faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faExclamationTriangle, faSpinner, faSignInAlt, faSignOutAlt,
  faKey, faCheck, faPlus, faSyncAlt, faAngleDoubleLeft,
  faAngleLeft, faAngleRight, faThLarge, faList, faEdit, faTrashAlt,
  faSave, faTimes, faDownload, faArrowCircleRight, faThumbsUp, faThumbsDown,
  faUndo, faClipboardCheck

);

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';


import { MaterialModule } from './material';

import { SharedModule } from './shared'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, NotFoundPageComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AuthModule,

    MaterialModule,

    FontAwesomeModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'MixERP FrontEnd App',
      logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),

    SharedModule,
    
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
