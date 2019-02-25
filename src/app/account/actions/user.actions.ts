import { Action } from '@ngrx/store';
import { UserDto } from 'src/app/shared/models';

export enum UserDisplayPage { Details = 'DETAILS', Roles = 'ROLES'}

export enum UserActionTypes {

    GetUsers = '[Account/Users/API] GetUsers',
    GetUsersSuccess = '[Account/Users/API] GetUsers Success',
    GetUsersFailure = '[Account/Users/API] GetUsers Failure',

    SelectUser = '[Account User Page] Select User',
    ClearSelectedUser = '[Account User Page] Clear Selected User',    
    SelectUserDisplayPage = '[Account User Page] Select User Display Page',


    SaveUser = '[Account/Users/API] Save User',
    SaveUserSuccess = '[Account/Users/API] Save User Success',
    SaveUserFailure = '[Account/Users/API] Save User Failure',

    UpdateUser = '[Account/Users/API] Update User',
    UpdateUserSuccess = '[Account/Users/API] Update User Success',
    UpdateUserFailure = '[Account/Users/API] Update User Failure',   

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class GetUsers implements Action {
    readonly type = UserActionTypes.GetUsers;

    constructor(public payload: string) {}
}

export class GetUsersSuccess implements Action {
    readonly type = UserActionTypes.GetUsersSuccess;

    constructor(public payload: UserDto[]) {}
}

export class GetUsersFailure implements Action {
    readonly type = UserActionTypes.GetUsersFailure;

    constructor(public payload: string) {}
}
  

export class SelectUser implements Action {
    readonly type = UserActionTypes.SelectUser;
  
    constructor(public payload: UserDto) {}
}

export class ClearSelectedUser implements Action {
    readonly type = UserActionTypes.ClearSelectedUser;  
}

export class SelectUserDisplayPage implements Action {
    readonly type = UserActionTypes.SelectUserDisplayPage; 
    constructor(public payload: UserDisplayPage) {} 
}

export class SaveUser implements Action {
    readonly type = UserActionTypes.SaveUser;
  
    constructor(public payload: {userDto: UserDto, officeId: string}) {}
}

export class SaveUserSuccess implements Action {
    readonly type = UserActionTypes.SaveUserSuccess;

    constructor(public payload: UserDto) {}
}

export class SaveUserFailure implements Action {
    readonly type = UserActionTypes.SaveUserFailure;

    constructor(public payload: string) {}
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UpdateUser;
  
    constructor(public payload: {userDto: UserDto, officeId: string}) {}
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserSuccess;

    constructor(public payload: UserDto) {}
}

export class UpdateUserFailure implements Action {
    readonly type = UserActionTypes.UpdateUserFailure;

    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActionsUnion = 
GetUsers 
|GetUsersSuccess 
|GetUsersFailure
|SelectUser 
|ClearSelectedUser
|SaveUser
|SaveUserSuccess
|SaveUserFailure
|UpdateUser
|UpdateUserSuccess
|UpdateUserFailure
|SelectUserDisplayPage;
