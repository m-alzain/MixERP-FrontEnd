import { Action } from '@ngrx/store';
import { TenantDto } from 'src/app/shared/models';

export enum TenantActionTypes {

    GetTenant = '[Account/Tenants/API] GetTenant',
    GetTenantSuccess = '[Account/Tenants/API] GetTenant Success',
    GetTenantFailure = '[Account/Tenants/API] GetTenant Failure',

    SelectTenant = '[Account Tenant Page] Select Tenant',
    ClearSelectedTenant = '[Account Tenant Page] Clear Selected Tenant',

    SaveTenant = '[Account/Tenants/API] Save Tenant',
    SaveTenantSuccess = '[Account/Tenants/API] Save Tenant Success',
    SaveTenantFailure = '[Account/Tenants/API] Save Tenant Failure',

    UpdateTenant = '[Account/Tenants/API] Update Tenant',
    UpdateTenantSuccess = '[Account/Tenants/API] Update Tenant Success',
    UpdateTenantFailure = '[Account/Tenants/API] Update Tenant Failure',

    // DeleteJournalEntry = '[JournalEntries/API] Delete JournalEntry',
    // DeleteJournalEntrySuccess = '[JournalEntries/API] Delete JournalEntry Success',
    // DeleteJournalEntryFailure = '[JournalEntries/API] Delete JournalEntry Failure',

    // ChangeStateJournalEntry = '[JournalEntries/API] ChangeState JournalEntry',
    // ChangeStateJournalEntrySuccess = '[JournalEntries/API] ChangeState JournalEntry Success',
    // ChangeStateJournalEntryFailure = '[JournalEntries/API] ChangeState JournalEntry Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class GetTenant implements Action {
    readonly type = TenantActionTypes.GetTenant;
}

export class GetTenantSuccess implements Action {
    readonly type = TenantActionTypes.GetTenantSuccess;

    constructor(public payload: TenantDto[]) {}
}

export class GetTenantFailure implements Action {
    readonly type = TenantActionTypes.GetTenantFailure;

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

    constructor(public payload: TenantDto[]) {}
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

    constructor(public payload: TenantDto[]) {}
}

export class UpdateTenantFailure implements Action {
    readonly type = TenantActionTypes.UpdateTenantFailure;

    constructor(public payload: string) {}
}

// export class DeleteJournalEntry implements Action {
//     readonly type = JournalEntryActionTypes.DeleteJournalEntry;
  
//     constructor(public payload: string) {}
// }

// export class DeleteJournalEntrySuccess implements Action {
//     readonly type = JournalEntryActionTypes.DeleteJournalEntrySuccess;

//     constructor(public payload: string) {}
// }

// export class DeleteJournalEntryFailure implements Action {
//     readonly type = JournalEntryActionTypes.DeleteJournalEntryFailure;

//     constructor(public payload: string) {}
// }
// //
// export class ChangeStateJournalEntry implements Action {
//     readonly type = JournalEntryActionTypes.ChangeStateJournalEntry;
  
//     constructor(public payload: EntryState) {}
// }

// export class ChangeStateJournalEntrySuccess implements Action {
//     readonly type = JournalEntryActionTypes.ChangeStateJournalEntrySuccess;

//     constructor(public payload: EntryState) {}
// }

// export class ChangeStateJournalEntryFailure implements Action {
//     readonly type = JournalEntryActionTypes.ChangeStateJournalEntryFailure;

//     constructor(public payload: string) {}
// }
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TenantActionsUnion = 
GetTenant 
|GetTenantSuccess 
|GetTenantFailure

|SelectTenant 
|ClearSelectedTenant
|SaveTenant
|SaveTenantSuccess
|SaveTenantFailure
|UpdateTenant
|UpdateTenantSuccess
|UpdateTenantFailure
// |DeleteJournalEntry
// |DeleteJournalEntrySuccess
// |DeleteJournalEntryFailure
// |ChangeStateJournalEntry
// |ChangeStateJournalEntrySuccess
// |ChangeStateJournalEntryFailure
;
