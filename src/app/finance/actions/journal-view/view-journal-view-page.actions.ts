import { Action } from '@ngrx/store';
import { JournalView } from '../../models';

export enum ViewJournalViewPageActionTypes {
  SelectJournalView = '[View JournalView Page] Select JournalView',
}

export class SelectJournalView implements Action {
  readonly type = ViewJournalViewPageActionTypes.SelectJournalView;

  constructor(public payload: number) {}
}

export type ViewJournalViewPageActionsUnion = SelectJournalView;
