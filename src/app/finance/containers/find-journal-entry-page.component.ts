import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {  SearchJournalEntry } from 'src/app/finance/actions';
import { JournalEntryDto } from 'src/app/finance/models';

import * as fromFinance from '../reducers';

import { EntryQuery } from 'src/app/shared/models';

@Component({
  selector: 'finance-journal-entry-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `  
    <finance-journal-entry-list
      [masterData]="journalEntries$  | async"
      [loading]="loading$  | async"
      [error]="error$  | async"     
      (search)="search($event)"
      >
    </finance-journal-entry-list>
   
  `,
})
export class FindJournalViewPageComponent {
  entryQuery$: Observable<EntryQuery>;
  journalEntries$: Observable<JournalEntryDto[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromFinance.State>) {
    this.entryQuery$ = store.pipe(
      select(fromFinance.getJournalEntrySearchQuery),
      take(1)
    );
    this.journalEntries$ = store.pipe(select(fromFinance.getJournalEntrySearchResults));
    this.loading$ = store.pipe(select(fromFinance.getJournalEntrySearchLoading));
    this.error$ = store.pipe(select(fromFinance.getJournalEntrySearchError));
  }

  search(query: EntryQuery) {
    this.store.dispatch(new SearchJournalEntry(query));
  }
}
