import { Action } from '@ngrx/store';
import { JournalEntryQuery, JournalEntryDto } from 'src/app/finance/models';
import { EntryState, EntryQuery } from 'src/app/shared/models';

export enum JournalEntryActionTypes {
  SearchJournalEntry = '[JournalEntries/API] Search JournalEntry',
  SearchJournalEntrySuccess = '[JournalEntries/API] Search JournalEntry Success',
  SearchJournalEntryFailure = '[JournalEntries/API] Search JournalEntry Failure',

  SelectJournalEntry = '[View JournalEntry Page] Select JournalEntry',

  SaveJournalEntry = '[JournalEntries/API] Save JournalEntry',
  SaveJournalEntrySuccess = '[JournalEntries/API] Save JournalEntry Success',
  SaveJournalEntryFailure = '[JournalEntries/API] Save JournalEntry Failure',

  UpdateJournalEntry = '[JournalEntries/API] Update JournalEntry',
  UpdateJournalEntrySuccess = '[JournalEntries/API] Update JournalEntry Success',
  UpdateJournalEntryFailure = '[JournalEntries/API] Update JournalEntry Failure',

  DeleteJournalEntry = '[JournalEntries/API] Delete JournalEntry',
  DeleteJournalEntrySuccess = '[JournalEntries/API] Delete JournalEntry Success',
  DeleteJournalEntryFailure = '[JournalEntries/API] Delete JournalEntry Failure',

  ChangeStateJournalEntry = '[JournalEntries/API] ChangeState JournalEntry',
  ChangeStateJournalEntrySuccess = '[JournalEntries/API] ChangeState JournalEntry Success',
  ChangeStateJournalEntryFailure = '[JournalEntries/API] ChangeState JournalEntry Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class SearchJournalEntry implements Action {
  readonly type = JournalEntryActionTypes.SearchJournalEntry;

  constructor(public payload: EntryQuery) {}
}

export class JournalEntrySearchSuccess implements Action {
    readonly type = JournalEntryActionTypes.SearchJournalEntrySuccess;

    constructor(public payload: JournalEntryDto[]) {}
}

export class JournalEntrySearchFailure implements Action {
    readonly type = JournalEntryActionTypes.SearchJournalEntryFailure;

    constructor(public payload: string) {}
}

export class SelectJournalEntry implements Action {
    readonly type = JournalEntryActionTypes.SelectJournalEntry;
  
    constructor(public payload: number) {}
}

export class SaveJournalEntry implements Action {
    readonly type = JournalEntryActionTypes.SaveJournalEntry;
  
    constructor(public payload: JournalEntryDto) {}
}

export class SaveJournalEntrySuccess implements Action {
    readonly type = JournalEntryActionTypes.SaveJournalEntrySuccess;

    constructor(public payload: JournalEntryDto) {}
}

export class SaveJournalEntryFailure implements Action {
    readonly type = JournalEntryActionTypes.SaveJournalEntryFailure;

    constructor(public payload: string) {}
}

export class UpdateJournalEntry implements Action {
    readonly type = JournalEntryActionTypes.UpdateJournalEntry;
  
    constructor(public payload: JournalEntryDto) {}
}

export class UpdateJournalEntrySuccess implements Action {
    readonly type = JournalEntryActionTypes.UpdateJournalEntrySuccess;

    constructor(public payload: JournalEntryDto) {}
}

export class UpdateJournalEntryFailure implements Action {
    readonly type = JournalEntryActionTypes.UpdateJournalEntryFailure;

    constructor(public payload: string) {}
}

export class DeleteJournalEntry implements Action {
    readonly type = JournalEntryActionTypes.DeleteJournalEntry;
  
    constructor(public payload: string) {}
}

export class DeleteJournalEntrySuccess implements Action {
    readonly type = JournalEntryActionTypes.DeleteJournalEntrySuccess;

    constructor(public payload: string) {}
}

export class DeleteJournalEntryFailure implements Action {
    readonly type = JournalEntryActionTypes.DeleteJournalEntryFailure;

    constructor(public payload: string) {}
}
//
export class ChangeStateJournalEntry implements Action {
    readonly type = JournalEntryActionTypes.ChangeStateJournalEntry;
  
    constructor(public payload: EntryState) {}
}

export class ChangeStateJournalEntrySuccess implements Action {
    readonly type = JournalEntryActionTypes.ChangeStateJournalEntrySuccess;

    constructor(public payload: EntryState) {}
}

export class ChangeStateJournalEntryFailure implements Action {
    readonly type = JournalEntryActionTypes.ChangeStateJournalEntryFailure;

    constructor(public payload: string) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type JournalEntryActionsUnion = 
SearchJournalEntry 
|JournalEntrySearchSuccess 
|JournalEntrySearchFailure

|SelectJournalEntry 

|SaveJournalEntry
|SaveJournalEntrySuccess
|SaveJournalEntryFailure
|UpdateJournalEntry
|UpdateJournalEntrySuccess
|UpdateJournalEntryFailure
|DeleteJournalEntry
|DeleteJournalEntrySuccess
|DeleteJournalEntryFailure
|ChangeStateJournalEntry
|ChangeStateJournalEntrySuccess
|ChangeStateJournalEntryFailure;
