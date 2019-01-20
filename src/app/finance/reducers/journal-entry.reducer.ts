import { JournalEntryActionsUnion, JournalEntryActionTypes } from 'src/app/finance/actions';
import { JournalEntryDto } from 'src/app/finance/models';
  
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EntryQuery } from 'src/app/shared/models';
  

// Search
export interface JournalEntrySearchState {
    ids: number[];
    loading: boolean;
    error: string;
    query: EntryQuery;
}
  
const initialJournalEntrySearchState: JournalEntrySearchState = {
    ids: [],
    loading: false,
    error: '',
    query: null
};
  
export function journalEntrySearchReducer(
    state = initialJournalEntrySearchState,
    action: JournalEntryActionsUnion
    ): JournalEntrySearchState {
    switch (action.type) {
        case JournalEntryActionTypes.SearchJournalEntry: {
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

        case JournalEntryActionTypes.SearchJournalEntrySuccess: {
        return {
            ids: action.payload.map(journalEntry => journalEntry.TransactionMasterId),
            loading: false,
            error: '',
            query: state.query,
        };
        }

        case JournalEntryActionTypes.SearchJournalEntryFailure: {
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
  
export const getJournalEntrySearchedIds = (searchState: JournalEntrySearchState) => searchState.ids;

export const getJournalEntrySearchedQuery = (searchState: JournalEntrySearchState) => searchState.query;

export const getJournalEntrySearchedLoading = (searchState: JournalEntrySearchState) => searchState.loading;

export const getJournalEntrySearchedError = (searchState: JournalEntrySearchState) => searchState.error;

// Entities

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface JournalEntryEntityState extends EntityState<JournalEntryDto> {
  selectedJournalEntryId: number | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const journalEntryAdapter: EntityAdapter<JournalEntryDto> = createEntityAdapter<JournalEntryDto>({
  selectId: (JournalEntryDto: JournalEntryDto) => JournalEntryDto.TransactionMasterId,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialJournalEntryEntityState: JournalEntryEntityState = journalEntryAdapter.getInitialState({
    selectedJournalEntryId: null,
});

export function journalEntryEntityReducer(
  state = initialJournalEntryEntityState,
  action:JournalEntryActionsUnion
): JournalEntryEntityState {
  switch (action.type) {
    case JournalEntryActionTypes.SearchJournalEntrySuccess:
    {
      /**
       * The addMany function provided by the created adapter
       * adds many records to the entity dictionary
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      return journalEntryAdapter.addMany(action.payload, state);
    }

    // case JournalEntryActions.JournalEntryActionTypes.LoadJournalEntry: {
    //   /**
    //    * The addOne function provided by the created adapter
    //    * adds one record to the entity dictionary
    //    * and returns a new state including that records if it doesn't
    //    * exist already. If the collection is to be sorted, the adapter will
    //    * insert the new record into the sorted array.
    //    */
    //   return adapter.addOne(action.payload, state);
    // }

    case JournalEntryActionTypes.SelectJournalEntry: {
      return {
        ...state,
        selectedJournalEntryId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedJournalEntryId = (journalEntryEntityState: JournalEntryEntityState) => journalEntryEntityState.selectedJournalEntryId;

  