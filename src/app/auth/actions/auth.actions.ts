import { Action } from '@ngrx/store';
import { User } from 'oidc-client';
import { UserDto, EntityTypeDto, OfficeDto, TenantDto } from 'src/app/shared/models';

export enum AuthActionTypes {
  LoginSuccess = '[Auth] Login Success',
  LogoutSuccess = '[Auth] Logout Success',

  GetAuthContext = '[Auth] GetAuthContext',
  GetAuthContextSuccess = '[Auth] GetAuthContext Success',
  GetAuthContextFailure = '[Auth] GetAuthContext Failure',

  GetEntityType = '[Auth] GetEntityType',
  GetEntityTypeSuccess = '[Auth] GetEntityType Success',
  GetEntityTypeFailure = '[Auth] GetEntityType Failure',

  SelectOffice = '[Auth] SelectOffice',
  SelectEntityType = '[Auth] SelectEntityType',
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}

export class GetEntityType implements Action {
  readonly type = AuthActionTypes.GetEntityType;
}

export class GetEntityTypeSuccess implements Action {
    readonly type = AuthActionTypes.GetEntityTypeSuccess;

    constructor(public payload: EntityTypeDto[]) {}
}

export class GetEntityTypeFailure implements Action {
    readonly type = AuthActionTypes.GetEntityTypeFailure;

    constructor(public payload: string) {}
}

export class GetAuthContext implements Action {
  readonly type = AuthActionTypes.GetAuthContext;
}

export class GetAuthContextSuccess implements Action {
    readonly type = AuthActionTypes.GetAuthContextSuccess;

    constructor(public payload: UserDto) {}
}

export class GetAuthContextFailure implements Action {
    readonly type = AuthActionTypes.GetAuthContextFailure;

    constructor(public payload: string) {}
}

export class SelectOffice implements Action {
  readonly type = AuthActionTypes.SelectOffice;

  constructor(public payload: OfficeDto) {}
}


export class SelectEntityType implements Action {
  readonly type = AuthActionTypes.SelectEntityType;

  constructor(public payload: string) {}
}


export type AuthActionsUnion = LoginSuccess 
| LogoutSuccess 
| GetAuthContext 
| GetAuthContextSuccess 
| GetAuthContextFailure 
| GetEntityType
| GetEntityTypeSuccess 
| GetEntityTypeFailure 
| SelectOffice 
| SelectEntityType;
