import { Action } from '@ngrx/store';

export enum PlaceholderActionTypes {
  OpenPlaceholder = '[Placeholder] Open',
  ClosePlaceholder = '[Placeholder] Close',
}

export class OpenPlaceholder implements Action {
  readonly type = PlaceholderActionTypes.OpenPlaceholder;
}

export class ClosePlaceholder implements Action {
  readonly type = PlaceholderActionTypes.ClosePlaceholder;
}

export type PlaceholderActionsUnion = OpenPlaceholder | ClosePlaceholder;
