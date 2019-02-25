import { Action } from '@ngrx/store';
import { RoleDto } from 'src/app/shared/models';

export enum RoleDisplayPage { Details = 'DETAILS', EntityTypes = 'ENTITYTYPES'}

export enum RoleActionTypes {

    GetRoles = '[Account/Roles/API] GetRoles',
    GetRolesSuccess = '[Account/Roles/API] GetRoles Success',
    GetRolesFailure = '[Account/Roles/API] GetRoles Failure',

    SelectRole = '[Account Role Page] Select Role',
    ClearSelectedRole = '[Account Role Page] Clear Selected Role',    
    SelectRoleDisplayPage = '[Account Role Page] Select Role Display Page',
    SetRoleTerm = '[Account Role Page] Set Role Term',

    SaveRole = '[Account/Roles/API] Save Role',
    SaveRoleSuccess = '[Account/Roles/API] Save Role Success',
    SaveRoleFailure = '[Account/Roles/API] Save Role Failure',

    UpdateRole = '[Account/Roles/API] Update Role',
    UpdateRoleSuccess = '[Account/Roles/API] Update Role Success',
    UpdateRoleFailure = '[Account/Roles/API] Update Role Failure',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class GetRoles implements Action {
    readonly type = RoleActionTypes.GetRoles;

    constructor(public payload: string ) {}
}

export class GetRolesSuccess implements Action {
    readonly type = RoleActionTypes.GetRolesSuccess;

    constructor(public payload: RoleDto[]) {}
}

export class GetRolesFailure implements Action {
    readonly type = RoleActionTypes.GetRolesFailure;

    constructor(public payload: string) {}
}
  

export class SelectRole implements Action {
    readonly type = RoleActionTypes.SelectRole;
  
    constructor(public payload:RoleDto) {}
}

export class SetRoleTerm implements Action {
    readonly type = RoleActionTypes.SetRoleTerm;
  
    constructor(public payload:string) {}
}

export class ClearSelectedRole implements Action {
    readonly type = RoleActionTypes.ClearSelectedRole;  
}

export class SelectRoleDisplayPage implements Action {
    readonly type = RoleActionTypes.SelectRoleDisplayPage; 
    constructor(public payload: RoleDisplayPage) {} 
}

export class SaveRole implements Action {
    readonly type = RoleActionTypes.SaveRole;
  
    constructor(public payload:  RoleDto) {}
}

export class SaveRoleSuccess implements Action {
    readonly type = RoleActionTypes.SaveRoleSuccess;

    constructor(public payload: RoleDto) {}
}

export class SaveRoleFailure implements Action {
    readonly type = RoleActionTypes.SaveRoleFailure;

    constructor(public payload: string) {}
}

export class UpdateRole implements Action {
    readonly type = RoleActionTypes.UpdateRole;
  
    constructor(public payload:  RoleDto) {}
}

export class UpdateRoleSuccess implements Action {
    readonly type = RoleActionTypes.UpdateRoleSuccess;

    constructor(public payload: RoleDto) {}
}

export class UpdateRoleFailure implements Action {
    readonly type = RoleActionTypes.UpdateRoleFailure;

    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type RoleActionsUnion = 
GetRoles 
|GetRolesSuccess 
|GetRolesFailure
|SelectRole 
|ClearSelectedRole
|SaveRole
|SaveRoleSuccess
|SaveRoleFailure
|UpdateRole
|UpdateRoleSuccess
|UpdateRoleFailure
|SelectRoleDisplayPage
|SetRoleTerm;
