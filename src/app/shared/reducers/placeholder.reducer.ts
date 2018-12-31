import {
    PlaceholderActions
  } from './../actions';
  
  export interface State {
    showPlaceholder: boolean;
  }
  
  const initialState: State = {
    showPlaceholder: false,
  };
  
  export function reducer(
    state: State = initialState,
    action: PlaceholderActions.PlaceholderActionsUnion
  ): State {
    switch (action.type) {
      case PlaceholderActions.PlaceholderActionTypes.ClosePlaceholder:
        return {
            showPlaceholder: false,
        };
  
      case PlaceholderActions.PlaceholderActionTypes.OpenPlaceholder:
        return {
            showPlaceholder: true,
        };
  
      default:
        return state;
    }
  }
  
  export const getShowPlaceholder = (state: State) => state.showPlaceholder;
  