import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromJournalViewSearch from './journal-view-search.reducer';
import * as fromJournalViews from './journal-view.reducer';
//import * as fromCollection from '@example-app/books/reducers/collection.reducer';
import * as fromRoot from '../../reducers';

export interface FinanceState {
  journalViewSearch: fromJournalViewSearch.State;
  journalViews: fromJournalViews.State;
  //collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  finance: FinanceState;
}

export const reducers: ActionReducerMap<FinanceState, any> = {
  journalViewSearch: fromJournalViewSearch.reducer,
  journalViews: fromJournalViews.reducer,
  //collection: fromCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `journalViews` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.journalViewsState$ = state$.pipe(select(getJournalViewsState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getFinanceState = createFeatureSelector<State, FinanceState>('finance');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getJournalViewsState = createSelector(
  getFinanceState,
  state => state.journalViews
);

export const getSelectedJournalViewId = createSelector(
  getJournalViewsState,
  fromJournalViews.getSelectedJournalViewId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getJournalViewIds,
  selectEntities: getJournalViewEntities,
  selectAll: getAllJournalViews,
  selectTotal: getTotalJournalViews,
} = fromJournalViews.adapter.getSelectors(getJournalViewsState);

export const getSelectedJournalView = createSelector(
  getJournalViewEntities,
  getSelectedJournalViewId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the JournalViews selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getJournalViewSearchState = createSelector(
  getFinanceState,
  (state: FinanceState) => state.journalViewSearch
);

export const getJournalViewSearchIds = createSelector(
  getJournalViewSearchState,
  fromJournalViewSearch.getIds
);
export const getJournalViewSearchQuery = createSelector(
  getJournalViewSearchState,
  fromJournalViewSearch.getQuery
);
export const getJournalViewSearchLoading = createSelector(
  getJournalViewSearchState,
  fromJournalViewSearch.getLoading
);
export const getJournalViewSearchError = createSelector(
  getJournalViewSearchState,
  fromJournalViewSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of JournalViews in the store.
 */
export const getJournalViewSearchResults = createSelector(
  getJournalViewEntities,
  getJournalViewSearchIds,
  (journalViews, searchIds) => {
    return searchIds.map(id => journalViews[id]);
  }
);

// export const getCollectionState = createSelector(
//   getFinanceState,
//   (state: FinanceState) => state.collection
// );

// export const getCollectionLoaded = createSelector(
//   getCollectionState,
//   fromCollection.getLoaded
// );
// export const getCollectionLoading = createSelector(
//   getCollectionState,
//   fromCollection.getLoading
// );
// export const getCollectionBookIds = createSelector(
//   getCollectionState,
//   fromCollection.getIds
// );

// export const getBookCollection = createSelector(
//   getJournalViewEntities,
//   getCollectionBookIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id]);
//   }
// );

// export const isSelectedBookInCollection = createSelector(
//   getCollectionBookIds,
//   getSelectedJournalViewId,
//   (ids, selected) => {
//     return selected && ids.indexOf(selected) > -1;
//   }
// );
