import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from './../../reducers';
  import * as fromAuth from './auth.reducer';
  import { AuthActionsUnion } from 'src/app/auth/actions';
import { AccessType } from 'src/app/shared/models';
  
  export interface AuthState {
    IdentityUserState: fromAuth.IdentityUserState;
    AuthContextState: fromAuth.AuthContextState;
    EntityTypeState: fromAuth.EntityTypeState;
  }
  
  export interface State extends fromRoot.State {
    auth: AuthState;
  }
  
  export const reducers: ActionReducerMap<
    AuthState,
    AuthActionsUnion
  > = {
    IdentityUserState: fromAuth.identityUserReducer,
    AuthContextState: fromAuth.authContextReducer,
    EntityTypeState: fromAuth.entityTypeReducer,
  };
  
  export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
  
  export const selectIdentityUserState = createSelector( selectAuthState,(state: AuthState) => state.IdentityUserState);
  export const getIdentityUser = createSelector(selectIdentityUserState, fromAuth.getIdentityUser);
  export const getLoggedIn = createSelector(getIdentityUser, user => !!user &&user.access_token && !user.expired);
  export const getAuthorizationHeaderValue = createSelector(getIdentityUser, user => !!user && `${user.token_type} ${user.access_token}`);
//----------
  export const selectAuthContextState = createSelector(selectAuthState, (state: AuthState) => state.AuthContextState);
  export const getAuthContext = createSelector(selectAuthContextState, fromAuth.getAuthContext);
  export const getOffices = createSelector(getAuthContext,  authContext => authContext.Offices);
  export const getAuthContextLoading = createSelector(selectAuthContextState,fromAuth.getAuthContextLoading);
  export const getSelectedOfficeId = createSelector(selectAuthContextState,fromAuth.getSelectedOfficeId);
  export const getSelectedOfficRole = createSelector(getAuthContext, getSelectedOfficeId,(authContext, officeId) => {
      return authContext.Roles.find( r => r.OfficeId == officeId);
    }
  );

  export const getSelectedEntityTypeId = createSelector(selectAuthContextState,fromAuth.getSelectedEntityTypeId);
  export const getSelectedEntityTypePolicy = createSelector(getSelectedOfficRole,getSelectedEntityTypeId,(role,entityTypeid) => {
      if(!!role){
        if(role.IsAdministrator)
        {
          return AccessType.VERIFY;
        }
        return role.GroupEntityAccessPolicies.find(p => p.EntityTypeId == entityTypeid).AccessType;
      }else{
        return -1;
      }
      
    }
  );
  //----------
  export const selectEntityTypeState = createSelector( selectAuthState,(state: AuthState) => state.EntityTypeState);
  export const getEntityTypes = createSelector(selectEntityTypeState, fromAuth.getEntityTypes);
  export const getEntityTypeLoading = createSelector(selectEntityTypeState, fromAuth.getEntityTypeLoading);
