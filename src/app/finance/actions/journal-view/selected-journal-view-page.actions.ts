import { Action } from '@ngrx/store';
import { JournalView } from '../../models';

export enum SelectedJournalViewPageActionTypes {
  AddJournalView = '[Selected JournalView Page] Add JournalView',
  RemoveJournalView = '[Selected JournalView Page] Remove JournalView',
}

/**
 * Add JournalView to Collection Action
 */
export class AddJournalView implements Action {
  readonly type = SelectedJournalViewPageActionTypes.AddJournalView;

  constructor(public payload: JournalView) {}
}

/**
 * Remove JournalView from Collection Action
 */
export class RemoveJournalView implements Action {
  readonly type = SelectedJournalViewPageActionTypes.RemoveJournalView;

  constructor(public payload: JournalView) {}
}

export type SelectedJournalViewPageActionsUnion = AddJournalView | RemoveJournalView;
