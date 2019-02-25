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
      case TenantActionTypes.GetTenants: {
          return {
            ...state,
            loading: true,
            error: '',
        };
      }
  
      case TenantActionTypes.GetTenantsSuccess: {
        return {
          tenants: action.payload,
          loading: false,
          error: '',
          selectedTenantId: '',
        };
      }
  
      case TenantActionTypes.GetTenantsFailure: {
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
          tenants: [...state.tenants ,action.payload],
          loading: false,
          error: '',
          selectedTenantId: action.payload.Id,
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
        var te = state.tenants.filter(t => t.Id != action.payload.Id);
        return {
          ...state,
          tenants: [...te ,action.payload],
          loading: false,
          error: '',
          selectedTenantId: action.payload.Id,
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

  
  
  