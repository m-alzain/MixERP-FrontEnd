import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from 'src/app/reducers';
  import * as fromTenant from './tenant.reducer';
  import { TenantActionsUnion } from 'src/app/account/actions';
  
  export interface AccountState {
    TenantState: fromTenant.TenantState;
  }
  
  export interface State extends fromRoot.State {
    account: AccountState;
  }
  
  export const reducers: ActionReducerMap<
    AccountState,
    | TenantActionsUnion 
  > = {
    TenantState: fromTenant.tenantReducer,   
  };
  
  export const selectAccountState = createFeatureSelector<State, AccountState>('account');
  
  export const selectTenantState = createSelector( selectAccountState ,(state: AccountState) => state.TenantState);
  export const getTenants = createSelector(selectTenantState, fromTenant.getTenants);
  export const getTenantLoading = createSelector(selectTenantState, fromTenant.getTenantLoading);
  export const getTenantError = createSelector(selectTenantState, fromTenant.getTenantError);
