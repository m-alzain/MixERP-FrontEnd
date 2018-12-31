import { Action } from '@ngrx/store';
import { JournalView } from '../../models';

export enum JournalViewActionTypes {
  LoadJournalView = '[JournalView Exists Guard] Load Book',
}

export class LoadJournalView implements Action {
  readonly type = JournalViewActionTypes.LoadJournalView;

  constructor(public payload: JournalView) {}
}

export type JournalViewActionsUnion = LoadJournalView;
