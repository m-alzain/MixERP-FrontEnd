import { TenantDto } from "src/app/shared/models";
import { TenantActionsUnion, TenantActionTypes } from "../actions/tenant.actions";

export interface TenantState {
    tenants: TenantDto[] | null;
    loading: boolean;
    error: string;
    selectedTenantId: string | null;
  }
  
  export const tenantInitialState: TenantState = {
    tenants: [],
    loading: false,
    error: '',
    selectedTenantId: null,
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
          selectedTenantId: null,
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
            selectedTenantId: action.payload,
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
  
  
  