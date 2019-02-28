import { UserDto } from "src/app/shared/models";
import { UserActionsUnion, UserActionTypes, UserDisplayPage } from "../actions";


  export interface UserState {
    users: UserDto[];
    loading: boolean;
    error: string;
    selectedUserId: string;
    userDisplayPage: UserDisplayPage;
    addExistingUser: boolean;
  }

  export const userInitialState: UserState = {
    users: [],
    loading: false,
    error: '',
    selectedUserId: '',
    userDisplayPage: UserDisplayPage.Details,
    addExistingUser: false,
  };
  
  export function userReducer(
    state = userInitialState,
    action: UserActionsUnion
  ): UserState {
    switch (action.type) {
      case UserActionTypes.GetUsers: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }
  
      case UserActionTypes.GetUsersSuccess: {
        return {
          users: action.payload,
          loading: false,
          error: '',
          selectedUserId: '',
          userDisplayPage: UserDisplayPage.Details,
          addExistingUser: false,
        };
      }
  
      case UserActionTypes.GetUsersFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case UserActionTypes.SelectUser: {
        return {
            ...state,
            selectedUserId: action.payload.Id,
        };
      }

      case UserActionTypes.ClearSelectedUser: {
        return {
            ...state,
            selectedUserId: '',
        };
      }

      case UserActionTypes.SelectUserDisplayPage: {
        return {
            ...state,
            userDisplayPage: action.payload,
        };
      }

      case UserActionTypes.SaveUser: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case UserActionTypes.SaveUserSuccess: {
        return {
          ...state,
          users: [...state.users ,action.payload],
          loading: false,
          error: '',
          selectedUserId: action.payload.Id,
        };
      }

      case UserActionTypes.SaveUserFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case UserActionTypes.UpdateUser: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case UserActionTypes.UpdateUserSuccess: {
        var te = state.users.filter(t => t.Id != action.payload.Id);
        return {
          ...state,
          users: [...te ,action.payload],
          loading: false,
          error: '',
          selectedUserId: action.payload.Id,
        };
      }

      case UserActionTypes.UpdateUserFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case UserActionTypes.AddExistingUser: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case UserActionTypes.AddExistingUserSuccess: {
        var te = state.users.filter(t => t.Id != action.payload.Id);
        return {
          ...state,
          users: [...te ,action.payload],
          loading: false,
          error: '',
          selectedUserId: action.payload.Id,
          addExistingUser: false,
        };
      }

      case UserActionTypes.AddExistingUserFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }
      case UserActionTypes.AddExistingUserToggle: {
        return {
            ...state,
            addExistingUser: action.payload,             
        };
      }

      case UserActionTypes.DeleteOfficeUser: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case UserActionTypes.DeleteOfficeUserSuccess: {
        var te = state.users.filter(t => t.Id != action.payload.Id);
        return {
          ...state,
          users: te,
          loading: false,
          error: '',
          selectedUserId: '',
        };
      }

      case UserActionTypes.DeleteOfficeUserFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }
      case UserActionTypes.ClearUsers: {
        return userInitialState;
      }

      default: {
        return state;
      }
    }
  }
  
  export const getUsers = (state: UserState) => state.users;
  export const getUserLoading = (state: UserState) => state.loading;
  export const getUserError = (state: UserState) => state.error;
  export const getSelectedUserId = (state: UserState) => state.selectedUserId;
  export const isAddingExistingUser = (state: UserState) => state.addExistingUser;

  
  
  