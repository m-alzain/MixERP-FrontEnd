import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from 'src/app/reducers';
  import * as fromTenant from './tenant.reducer';
  import { TenantActionsUnion } from 'src/app/dashboard/actions';
  
  export interface DashboardState {
    TenantState: fromTenant.TenantState;
  }
  
  export interface State extends fromRoot.State {
    dashboard: DashboardState;
  }
  
  export const reducers: ActionReducerMap<
    DashboardState,
    | TenantActionsUnion 
  > = {
    TenantState: fromTenant.tenantReducer,   
  };
  
  export const selectDashboardState = createFeatureSelector<State, DashboardState>('dashboard');
  
  export const selectTenantState = createSelector( selectDashboardState ,(state: DashboardState) => state.TenantState);
  export const getTenants = createSelector(selectTenantState, fromTenant.getTenants);
  export const getTenantLoading = createSelector(selectTenantState, fromTenant.getTenantLoading);
  export const getTenantError = createSelector(selectTenantState, fromTenant.getTenantError);
