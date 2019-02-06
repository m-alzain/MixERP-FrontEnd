import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';
import { environment } from './../../../environments/environment';
import { AuthContext } from './../models/auth-context';
import * as fromRoot from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { LoginSuccess, LogoutSuccess } from 'src/app/auth/actions';
import { Utils } from 'src/app/shared/utilities'


@Injectable()
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  authContext: AuthContext;

  constructor(private store: Store<fromRoot.State>, private httpClient: HttpClient) {
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
      console.log('Login sucess has been dispatched');
    });
  }

  logout(): Promise<any> {
    return this._userManager.signoutPopup().then( ()=> {
        this.store.dispatch(new LogoutSuccess());
        console.log('Logout has been dispatched');
    });
  }

  isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }

  loadSecurityContext() {
    this.httpClient.get<AuthContext>(`${environment.apiRoot}Account/AuthContext`).subscribe(context => {
      this.authContext = context;
    }, error => console.error(Utils.formatError(error)));
  }

  // we are using login() instead
  // startAuthentication(): Promise<void> {
  //   return this._userManager.signinRedirect();
  // }

  // completeAuthentication(): Promise<void> {
  //     return this._userManager.signinRedirectCallback().then(user => {
  //         this._user = user;
  //     });
  // }

  getAuthorizationHeaderValue(): string {
    return `${this._user.token_type} ${this._user.access_token}`;
  }

  getClaims(): any {
    return this._user.profile;
  }

  completeAuthentication(): Promise<void> {
    return this._userManager.signinPopupCallback().then(user => {
        this._user = user;
        this.store.dispatch(new LoginSuccess(user));
        console.log('Login sucess has been dispatched');
    });
  }


  completeSignout(): Promise<void> {
        return this._userManager.signoutPopupCallback().then( ()=> {
        this.store.dispatch(new LogoutSuccess());
        console.log('Logout has been dispatched');
    });
  }
}

