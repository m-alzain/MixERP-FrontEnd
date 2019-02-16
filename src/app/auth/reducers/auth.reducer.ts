import { AuthActionsUnion , AuthActionTypes} from 'src/app/auth/actions';
import { User } from 'oidc-client';
import { UserDto, EntityTypeDto } from 'src/app/shared/models';

export interface IdentityUserState {
  user: User | null;
}

export const identityUserInitialState: IdentityUserState = {
  user: null,
};

export function identityUserReducer(
  state = identityUserInitialState,
  action: AuthActionsUnion
): IdentityUserState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.LogoutSuccess: {
      return identityUserInitialState;
    }

    default: {
      return state;
    }
  }
}

export const getIdentityUser = (state: IdentityUserState) => state.user;

///----------------------------------------------

export interface AuthContextState {
  user: UserDto | null;
  loading: boolean;
  error: string;
  selectedOfficeId ?: string;
  selectedEntityTypeId ?: string;
}

export const authContexInitialState: AuthContextState = {
  user: null,
  loading: false,
  error: '',
  selectedOfficeId : null,
  selectedEntityTypeId : null,
};

export function authContextReducer(
  state = authContexInitialState,
  action: AuthActionsUnion
): AuthContextState {
  switch (action.type) {
    case AuthActionTypes.GetAuthContext: {
        return {
          ...state,
          loading: true,
          error: '',
      };
    }

    case AuthActionTypes.GetAuthContextSuccess: {
      return {
        user: action.payload,
        loading: false,
        error: ''
      };
    }

    case AuthActionTypes.GetAuthContextFailure: {
      return {
          ...state,
          loading: false,
          error: action.payload,          
      };
    }
    case AuthActionTypes.SelectOffice: {
      return {
          ...state,
          selectedOfficeId: action.payload,
      };
    }
    case AuthActionTypes.SelectEntityType: {
      return {
          ...state,
          selectedEntityTypeId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getAuthContex = (state: AuthContextState) => state.user;
export const getAuthContextLoading = (state: AuthContextState) => state.loading;
export const getSelectedOfficeId = (state: AuthContextState) => state.selectedOfficeId;
export const getSelectedEntityTypeId = (state: AuthContextState) => state.selectedEntityTypeId;

///----------------------------------------------

export interface EntityTypeState {
  entityTypes: EntityTypeDto[] | null;
  loading: boolean;
  error: string;
}

export const entityTypeInitialState: EntityTypeState = {
  entityTypes: [],
  loading: false,
  error: '',
};

export function entityTypeReducer(
  state = entityTypeInitialState,
  action: AuthActionsUnion
): EntityTypeState {
  switch (action.type) {
    case AuthActionTypes.GetEntityType: {
        return {
          ...state,
          loading: true,
          error: '',
      };
    }

    case AuthActionTypes.GetEntityTypeSuccess: {
      return {
        entityTypes: action.payload,
        loading: false,
        error: ''
      };
    }

    case AuthActionTypes.GetEntityTypeFailure: {
      return {
          ...state,
          loading: false,
          error: action.payload,          
      };
    }
    default: {
      return state;
    }
  }
}

export const getEntityTypes = (state: EntityTypeState) => state.entityTypes;
export const getEntityTypeLoading = (state: EntityTypeState) => state.loading;


