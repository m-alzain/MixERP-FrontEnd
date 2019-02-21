import { TenantDto } from "src/app/shared/models";
import { TenantActionsUnion, TenantActionTypes } from "../actions/tenant.actions";

export interface TenantState {
    tenants: TenantDto[];
    loading: boolean;
    error: string;
    selectedTenantId: string;
  }
  
  export const tenantInitialState: TenantState = {
    tenants: [],
    loading: false,
    error: '',
    selectedTenantId: '',
  };
  
  export function tenantReducer(
    state = tenantInitialState,
    action: TenantActionsUnion
  ): TenantState {
    switch (action.type) {
      case TenantActionTypes.GetTenant: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }
  
      case TenantActionTypes.GetTenantSuccess: {
        return {
          tenants: action.payload,
          loading: false,
          error: '',
          selectedTenantId: '',
        };
      }
  
      case TenantActionTypes.GetTenantFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case TenantActionTypes.SelectTenant: {
        return {
            ...state,
            selectedTenantId: action.payload.Id,
        };
      }

      case TenantActionTypes.ClearSelectedTenant: {
        return {
            ...state,
            selectedTenantId: '',
        };
      }

      case TenantActionTypes.SaveTenant: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case TenantActionTypes.SaveTenantSuccess: {
        return {
          ...state,
          tenants: action.payload,
          loading: false,
          error: '',
        };
      }

      case TenantActionTypes.SaveTenantFailure: {
        return {
            ...state,
            loading: false,
            error: action.payload,          
        };
      }

      case TenantActionTypes.UpdateTenant: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }

      case TenantActionTypes.UpdateTenantSuccess: {
        return {
          ...state,
          tenants: action.payload,
          loading: false,
          error: '',
        };
      }

      case TenantActionTypes.UpdateTenantFailure: {
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
  
  export const getTenants = (state: TenantState) => state.tenants;
  export const getTenantLoading = (state: TenantState) => state.loading;
  export const getTenantError = (state: TenantState) => state.error;
  export const getSelectedTenantId = (state: TenantState) => state.selectedTenantId;

  
  
  