import { Action } from '@ngrx/store';
import { JournalViewQuery } from './../../models';

export enum FindJournalViewPageActionTypes {
  SearchJournalViews = '[Find JournalView Page] Search JournalViews',
}

export class SearchJournalViews implements Action {
  readonly type = FindJournalViewPageActionTypes.SearchJournalViews;

  constructor(public payload: JournalViewQuery) {}
}

export type FindJournalViewPageActionsUnion = SearchJournalViews;
