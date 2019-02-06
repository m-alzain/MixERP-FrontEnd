import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from './../../reducers';
  import * as fromAuth from './auth.reducer';
  import { AuthActionsUnion } from 'src/app/auth/actions';
  
  export interface AuthState {
    status: fromAuth.state;
  }
  
  export interface State extends fromRoot.State {
    auth: fromAuth.state;
  }
  
  export const reducers: ActionReducerMap<
    AuthState,
    AuthActionsUnion
  > = {
    status: fromAuth.reducer,
  };
  
  export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
  
  export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
  );
  export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
  export const getLoggedIn = createSelector(getUser, user => !!user &&user.access_token && !user.expired);
  