import { Action } from '@ngrx/store';
import { TenantDto } from 'src/app/shared/models';

export enum TenantActionTypes {

    GetTenant = '[Dashboard/Tenants/API] GetTenant',
    GetTenantSuccess = '[Dashboard/Tenants/API] GetTenant Success',
    GetTenantFailure = '[Dashboard/Tenants/API] GetTenant Failure',

    SelectTenant = '[Dashboard Tenant Page] Select Tenant',

    // SaveJournalEntry = '[JournalEntries/API] Save JournalEntry',
    // SaveJournalEntrySuccess = '[JournalEntries/API] Save JournalEntry Success',
    // SaveJournalEntryFailure = '[JournalEntries/API] Save JournalEntry Failure',

    // UpdateJournalEntry = '[JournalEntries/API] Update JournalEntry',
    // UpdateJournalEntrySuccess = '[JournalEntries/API] Update JournalEntry Success',
    // UpdateJournalEntryFailure = '[JournalEntries/API] Update JournalEntry Failure',

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
  
    constructor(public payload: string) {}
}

// export class SaveJournalEntry implements Action {
//     readonly type = JournalEntryActionTypes.SaveJournalEntry;
  
//     constructor(public payload: JournalEntryDto) {}
// }

// export class SaveJournalEntrySuccess implements Action {
//     readonly type = JournalEntryActionTypes.SaveJournalEntrySuccess;

//     constructor(public payload: JournalEntryDto) {}
// }

// export class SaveJournalEntryFailure implements Action {
//     readonly type = JournalEntryActionTypes.SaveJournalEntryFailure;

//     constructor(public payload: string) {}
// }

// export class UpdateJournalEntry implements Action {
//     readonly type = JournalEntryActionTypes.UpdateJournalEntry;
  
//     constructor(public payload: JournalEntryDto) {}
// }

// export class UpdateJournalEntrySuccess implements Action {
//     readonly type = JournalEntryActionTypes.UpdateJournalEntrySuccess;

//     constructor(public payload: JournalEntryDto) {}
// }

// export class UpdateJournalEntryFailure implements Action {
//     readonly type = JournalEntryActionTypes.UpdateJournalEntryFailure;

//     constructor(public payload: string) {}
// }

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

// |SaveJournalEntry
// |SaveJournalEntrySuccess
// |SaveJournalEntryFailure
// |UpdateJournalEntry
// |UpdateJournalEntrySuccess
// |UpdateJournalEntryFailure
// |DeleteJournalEntry
// |DeleteJournalEntrySuccess
// |DeleteJournalEntryFailure
// |ChangeStateJournalEntry
// |ChangeStateJournalEntrySuccess
// |ChangeStateJournalEntryFailure
;
