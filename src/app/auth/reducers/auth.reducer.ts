import { AuthActionsUnion , AuthActionTypes} from 'src/app/auth/actions';
import { User } from 'oidc-client';
import { UserManager } from 'oidc-client';

export interface state {
  user: User | null;
}

export const initialState: state = {
  user: null,
};

export function reducer(
  state = initialState,
  action: AuthActionsUnion
): state {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.LogoutSuccess: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: state) => state.user;
