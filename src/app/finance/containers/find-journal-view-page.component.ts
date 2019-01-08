import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindJournalViewPageActions } from '../actions';
import { JournalView, JournalViewQuery } from '../models';
import * as fromFinance from '../reducers';

@Component({
  selector: 'bc-journal-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-journal-view-search
      (search)="search($event)">
    </bc-journal-view-search>
  
    <bc-journal-view-preview-list
      [masterData]="journalViews$  | async"
      [loading]="loading$  | async"
      [error]="error$  | async"
      >
    </bc-journal-view-preview-list>
   
  `,
})
export class FindJournalViewPageComponent {
  journalViewSearchQuery$: Observable<JournalViewQuery>;
  journalViews$: Observable<JournalView[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromFinance.State>) {
    this.journalViewSearchQuery$ = store.pipe(
      select(fromFinance.getJournalViewSearchQuery),
      take(1)
    );
    this.journalViews$ = store.pipe(select(fromFinance.getJournalViewSearchResults));
    this.loading$ = store.pipe(select(fromFinance.getJournalViewSearchLoading));
    this.error$ = store.pipe(select(fromFinance.getJournalViewSearchError));
  }

  search(query: JournalViewQuery) {
    this.store.dispatch(new FindJournalViewPageActions.SearchJournalViews(query));
  }
}
