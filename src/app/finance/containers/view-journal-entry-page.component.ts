import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromFinance from 'src/app/finance/reducers';
import { SelectJournalEntry } from 'src/app/finance/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Journal Entry Page's responsibility is to map router params
 * to a 'Select' Journal Entry action. Actually showing the selected
 * Journal Entry remains a responsibility of the
 * JournalEntryDetailComponent
 */
@Component({
  selector: 'finance-view-journal-entry-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <finance-journal-entry-detail></finance-journal-entry-detail>
  `,
})
export class ViewJournalEntryPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromFinance.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new SelectJournalEntry(+params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
  
}
