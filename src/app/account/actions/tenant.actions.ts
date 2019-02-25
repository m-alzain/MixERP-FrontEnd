import { Action } from '@ngrx/store';
import { TenantDto } from 'src/app/shared/models';

export enum TenantActionTypes {

    GetTenants = '[Account/Tenants/API] GetTenants',
    GetTenantsSuccess = '[Account/Tenants/API] GetTenants Success',
    GetTenantsFailure = '[Account/Tenants/API] GetTenants Failure',

    SelectTenant = '[Account Tenant Page] Select Tenant',
    ClearSelectedTenant = '[Account Tenant Page] Clear Selected Tenant',

    SaveTenant = '[Account/Tenants/API] Save Tenant',
    SaveTenantSuccess = '[Account/Tenants/API] Save Tenant Success',
    SaveTenantFailure = '[Account/Tenants/API] Save Tenant Failure',

    UpdateTenant = '[Account/Tenants/API] Update Tenant',
    UpdateTenantSuccess = '[Account/Tenants/API] Update Tenant Success',
    UpdateTenantFailure = '[Account/Tenants/API] Update Tenant Failure',

}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class GetTenants implements Action {
    readonly type = TenantActionTypes.GetTenants;
}

export class GetTenantsSuccess implements Action {
    readonly type = TenantActionTypes.GetTenantsSuccess;

    constructor(public payload: TenantDto[]) {}
}

export class GetTenantsFailure implements Action {
    readonly type = TenantActionTypes.GetTenantsFailure;

    constructor(public payload: string) {}
}
  

export class SelectTenant implements Action {
    readonly type = TenantActionTypes.SelectTenant;
  
    constructor(public payload: TenantDto) {}
}

export class ClearSelectedTenant implements Action {
    readonly type = TenantActionTypes.ClearSelectedTenant;  
}

export class SaveTenant implements Action {
    readonly type = TenantActionTypes.SaveTenant;
  
    constructor(public payload: TenantDto) {}
}

export class SaveTenantSuccess implements Action {
    readonly type = TenantActionTypes.SaveTenantSuccess;

    constructor(public payload: TenantDto) {}
}

export class SaveTenantFailure implements Action {
    readonly type = TenantActionTypes.SaveTenantFailure;

    constructor(public payload: string) {}
}

export class UpdateTenant implements Action {
    readonly type = TenantActionTypes.UpdateTenant;
  
    constructor(public payload: TenantDto) {}
}

export class UpdateTenantSuccess implements Action {
    readonly type = TenantActionTypes.UpdateTenantSuccess;

    constructor(public payload: TenantDto) {}
}

export class UpdateTenantFailure implements Action {
    readonly type = TenantActionTypes.UpdateTenantFailure;

    constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TenantActionsUnion = 
GetTenants 
|GetTenantsSuccess 
|GetTenantsFailure
|SelectTenant 
|ClearSelectedTenant
|SaveTenant
|SaveTenantSuccess
|SaveTenantFailure
|UpdateTenant
|UpdateTenantSuccess
|UpdateTenantFailure;
