import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';
import { environment } from './../../../environments/environment';
import { UserDto } from 'src/app/shared/models';
import * as fromRoot from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { LoginSuccess, LogoutSuccess, GetAuthContext, GetEntityType } from 'src/app/auth/actions';

@Injectable()
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  authContext: UserDto;

  constructor(private store: Store<fromRoot.State>) {
    Log.logger = console;
    var config = {
      authority: environment.Configuration.stsAuthority,
      client_id: environment.Configuration.clientId,     
      popup_redirect_uri: environment.Configuration.popup_redirect_uri,
      scope: environment.Configuration.scope,
      response_type: environment.Configuration.response_type,    
      post_logout_redirect_uri: environment.Configuration.post_logout_redirect_uri,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: environment.Configuration.silent_redirect_uri
    };
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
        this.loadSecurityContext();

      }
    });
    this._userManager.events.addUserLoaded(args => {
      this._userManager.getUser().then(user => {
        this._user = user;
        this.loadSecurityContext();
      });
    });
  }

  login(): Promise<any> {
    return this._userManager.signinPopup().then(user => {
      this._user = user;
      this.store.dispatch(new LoginSuccess({user}));     
    });
  }

  logout(): Promise<any> {
    return this._userManager.signoutPopup().then( ()=> {
        this.store.dispatch(new LogoutSuccess());      
    });
  }


  signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }

  loadSecurityContext() {
    this.store.dispatch(new GetAuthContext());
    this.store.dispatch(new GetEntityType());
  }


  getClaims(): any {
    return this._user.profile;
  }

  completeAuthentication(): Promise<void> {  // has not been called, although it should
    return this._userManager.signinPopupCallback().then(user => {
        this._user = user;        
    });
  }


  completeSignout(): Promise<void> { // has not been called, although it should
        return this._userManager.signoutPopupCallback().then( ()=> {             
    });
  }
}

