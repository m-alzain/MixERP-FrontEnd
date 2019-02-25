import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from 'src/app/reducers';
  import * as fromTenant from './tenant.reducer';
  import * as fromUser from './user.reducer';
  import * as fromRole from './role.reducer';
  import { TenantActionsUnion, UserActionsUnion, RoleActionsUnion } from 'src/app/account/actions';
  
  
  export interface AccountState {
    TenantState: fromTenant.TenantState;
    UserState: fromUser.UserState;
    RoleState: fromRole.RoleState;
  }
  
  export interface State extends fromRoot.State {
    account: AccountState;
  }
  
  export const reducers: ActionReducerMap<
    AccountState,
    | TenantActionsUnion 
    | UserActionsUnion 
    | RoleActionsUnion 
  > = {
    TenantState: fromTenant.tenantReducer,  
    UserState: fromUser.userReducer, 
    RoleState: fromRole.roleReducer, 
  };
  
  export const selectAccountState = createFeatureSelector<State, AccountState>('account');
  ///////////////////////////////
  export const selectTenantState = createSelector( selectAccountState ,(state: AccountState) => state.TenantState);
  export const getTenants = createSelector(selectTenantState, fromTenant.getTenants);
  export const getTenantLoading = createSelector(selectTenantState, fromTenant.getTenantLoading);
  export const getTenantError = createSelector(selectTenantState, fromTenant.getTenantError);
  export const getSelectedTenantId = createSelector(selectTenantState, fromTenant.getSelectedTenantId);
  export const getSelectedTenant = createSelector(getTenants,getSelectedTenantId,  (tenants, id) => tenants.find(t => !!id && t.Id == id)); 
  export const getSelectedTenantOffices = createSelector(getSelectedTenant, t => !!t && t.Offices);
  ///////////////////////////////
  export const selectUserState = createSelector( selectAccountState ,(state: AccountState) => state.UserState);
  export const getUsers = createSelector(selectUserState, fromUser.getUsers);
  export const getUserLoading = createSelector(selectUserState, fromUser.getUserLoading);
  export const getUserError = createSelector(selectUserState, fromUser.getUserError);
  export const getSelectedUserId = createSelector(selectUserState, fromUser.getSelectedUserId);
  export const getSelectedUser = createSelector(getUsers,getSelectedUserId,  (users, id)  => !!id && users.find(t => !!id && t.Id == id)); 
  export const getUserDisplayPage = createSelector(selectUserState, state => state.userDisplayPage);
  ///////////////////////////////
  export const selectRoleState = createSelector( selectAccountState ,(state: AccountState) => state.RoleState);
  export const getRoles = createSelector(selectRoleState, fromRole.getRoles);
  export const getRoleLoading = createSelector(selectRoleState, fromRole.getRoleLoading);
  export const getRoleError = createSelector(selectRoleState, fromRole.getRoleError);
  export const getSelectedRoleId = createSelector(selectRoleState, fromRole.getSelectedRoleId);
  export const getRoleDisplayPage = createSelector(selectRoleState, fromRole.getRoleDisplayPage);
  export const getSelectedRole = createSelector(getRoles,getSelectedRoleId,  (roles, id)  => !!id && roles.find(t => !!id && t.Id == id)); 
  export const getRoleSearchTerm = createSelector(selectRoleState, fromRole.getRoleSearchTerm);
  export const getSearchedRoles = createSelector(getRoles,getRoleSearchTerm,  (roles, term)  => roles.filter(role => role.RoleName.includes(term.trim()))); 
  
