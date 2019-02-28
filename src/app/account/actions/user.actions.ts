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
    
    AddExistingUser = '[Account/Users/API] AddExisting User',
    AddExistingUserSuccess = '[Account/Users/API] AddExisting User Success',
    AddExistingUserFailure = '[Account/Users/API] AddExisting User Failure', 
    AddExistingUserToggle = '[Account User Page] AddExisting User Toggle',

    DeleteOfficeUser = '[Account/Users/API] Delete OfficeUser',
    DeleteOfficeUserSuccess = '[Account/Users/API] Delete OfficeUser Success',
    DeleteOfficeUserFailure = '[Account/Users/API] Delete OfficeUser Failure',

    ClearUsers = '[Account/Users/API] Clear Users',
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

export class AddExistingUser implements Action {
    readonly type = UserActionTypes.AddExistingUser;
  
    constructor(public payload: {userDto: UserDto, officeId: string}) {}
}

export class AddExistingUserSuccess implements Action {
    readonly type = UserActionTypes.AddExistingUserSuccess;

    constructor(public payload: UserDto) {}
}

export class AddExistingUserFailure implements Action {
    readonly type = UserActionTypes.AddExistingUserFailure;

    constructor(public payload: string) {}
}

export class AddExistingUserToggle implements Action {
    readonly type = UserActionTypes.AddExistingUserToggle; 
    constructor(public payload: boolean) {} 
}

export class DeleteOfficeUser implements Action {
    readonly type = UserActionTypes.DeleteOfficeUser;
  
    constructor(public payload: {userId : string, officeId: string}  ) {}
}

export class DeleteOfficeUserSuccess implements Action {
    readonly type = UserActionTypes.DeleteOfficeUserSuccess;

    constructor(public payload: UserDto) {}
}

export class DeleteOfficeUserFailure implements Action {
    readonly type = UserActionTypes.DeleteOfficeUserFailure;

    constructor(public payload: string) {}
}

export class ClearUsers implements Action {
    readonly type = UserActionTypes.ClearUsers;     
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
|SelectUserDisplayPage
|AddExistingUser
|AddExistingUserSuccess
|AddExistingUserFailure
|AddExistingUserToggle
|DeleteOfficeUser
|DeleteOfficeUserSuccess
|DeleteOfficeUserFailure
|ClearUsers;
