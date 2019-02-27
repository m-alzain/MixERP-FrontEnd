import { RoleDto } from "src/app/shared/models";
import { RoleActionsUnion, RoleActionTypes, RoleDisplayPage } from "../actions";


  export interface RoleState {
    roles: RoleDto[];
    loading: boolean;
    error: string;
    selectedRoleId: string;
    roleDisplayPage: RoleDisplayPage;
    roleSearchTerm: string;
  }

  export const roleInitialState: RoleState = {
    roles: [],
    loading: false,
    error: '',
    selectedRoleId: '',
    roleDisplayPage: RoleDisplayPage.Details,
    roleSearchTerm:'',
  };
  
  export function roleReducer(
    state = roleInitialState,
    action: RoleActionsUnion
  ): RoleState {
    switch (action.type) {
      case RoleActionTypes.GetRoles: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }
  
      case RoleActionTypes.GetRolesSuccess: {
        return {
          roles: action.payload,
          loading: false,
          error: '',
          selectedRoleId: '',
          roleDisplayPage: RoleDisplayPage.Details,
          roleSearchTerm:'',
        };
      }
  
      case RoleActionTypes.GetRolesFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case RoleActionTypes.SelectRole: {
        return {
            ...state,
            selectedRoleId: action.payload.Id,
        };
      }

      case RoleActionTypes.SetRoleSearchTerm: {
        return {
            ...state,
            roleSearchTerm: action.payload,
        };
      }
      
      case RoleActionTypes.ClearSelectedRole: {
        return {
            ...state,
            selectedRoleId: '',
        };
      }

      case RoleActionTypes.SelectRoleDisplayPage: {
        return {
            ...state,
            roleDisplayPage: action.payload,
        };
      }

      case RoleActionTypes.SaveRole: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case RoleActionTypes.SaveRoleSuccess: {
        return {
          ...state,
          roles: [...state.roles ,action.payload],
          loading: false,
          error: '',
          selectedRoleId: action.payload.Id,
        };
      }

      case RoleActionTypes.SaveRoleFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case RoleActionTypes.UpdateRole: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case RoleActionTypes.UpdateRoleSuccess: {
        var te = state.roles.filter(t => t.Id != action.payload.Id);
        return {
          ...state,
          roles: [...te ,action.payload],
          loading: false,
          error: '',
          selectedRoleId: action.payload.Id,
        };
      }

      case RoleActionTypes.UpdateRoleFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case RoleActionTypes.DeleteRole: {
        return {
          ...state,
          loading: true,
          error: '',
      };
    }

    case RoleActionTypes.DeleteRoleSuccess: {
      var te = state.roles.filter(t => t.Id != action.payload.Id);
      return {
        ...state,
        roles: te,
        loading: false,
        error: '',
        selectedRoleId: '',
      };
    }

    case RoleActionTypes.DeleteRoleFailure: {
      return {
          ...state,
          loading: false,
          error: action.payload,          
      };
    }

    case RoleActionTypes.ClearRoles: {
        return roleInitialState;
    }
      default: {
        return state;
      }
    }
  }
  
  export const getRoles = (state: RoleState) => state.roles;
  export const getRoleLoading = (state: RoleState) => state.loading;
  export const getRoleError = (state: RoleState) => state.error;
  export const getSelectedRoleId = (state: RoleState) => state.selectedRoleId;
  export const getRoleDisplayPage = (state: RoleState) => state.roleDisplayPage;
  export const getRoleSearchTerm = (state: RoleState) => state.roleSearchTerm;
  

  
  
  