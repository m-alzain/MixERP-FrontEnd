import { Action } from '@ngrx/store';
import { User } from 'oidc-client';

export enum AuthActionTypes {
  LoginSuccess = '[Auth] Login Success',
  LogoutSuccess = '[Auth] Logout',
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}


export type AuthActionsUnion = LoginSuccess | LogoutSuccess;
