import {
    JournalViewsApiActions,
    FindJournalViewPageActions,
  } from '../actions';
  import { JournalViewQuery } from '../models';
  
  export interface State {
    ids: number[];
    loading: boolean;
    error: string;
    query: JournalViewQuery;
  }
  
  const initialState: State = {
    ids: [],
    loading: false,
    error: '',
    //query: {Amount:0,Book:'',From: '2017-01-01', To: '2018-12-31', Office:'Default', OfficeId:1,PostedBy:'test_user',Reason:'',ReferenceNumber:'1',StatementReference:'',Status:'',TranCode:'',TranId:0,UserId:1,VerifiedBy:'' },
    query: null
};
  
  export function reducer(
    state = initialState,
    action:
      | JournalViewsApiActions.JournalViewsApiActionsUnion
      | FindJournalViewPageActions.FindJournalViewPageActionsUnion
  ): State {
    switch (action.type) {
      case FindJournalViewPageActions.FindJournalViewPageActionTypes.SearchJournalViews: {
        const query = action.payload;
  
        if (query == null) {
          return {
            ids: [],
            loading: false,
            error: '',
            query,
          };
        }
  
        return {
          ...state,
          loading: true,
          error: '',
          query,
        };
      }
  
      case JournalViewsApiActions.JournalViewsApiActionTypes.SearchSuccess: {
        return {
          ids: action.payload.map(journalView => journalView.transactionMasterId),
          loading: false,
          error: '',
          query: state.query,
        };
      }
  
      case JournalViewsApiActions.JournalViewsApiActionTypes.SearchFailure: {
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
  
  export const getIds = (state: State) => state.ids;
  
  export const getQuery = (state: State) => state.query;
  
  export const getLoading = (state: State) => state.loading;
  
  export const getError = (state: State) => state.error;
  