import { Action } from '@ngrx/store';
import { JournalView } from '../../models';

export enum JournalViewsApiActionTypes {
  SearchSuccess = '[JournalViews/API] Search Success',
  SearchFailure = '[JournalViews/API] Search Failure',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class JournalViewSearchSuccess implements Action {
  readonly type = JournalViewsApiActionTypes.SearchSuccess;

  constructor(public payload: JournalView[]) {}
}

export class JournalViewSearchFailure implements Action {
  readonly type = JournalViewsApiActionTypes.SearchFailure;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type JournalViewsApiActionsUnion = JournalViewSearchSuccess | JournalViewSearchFailure;
