import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromFinance from 'src/app/finance/reducers';
import { ViewJournalViewPageActions } from 'src/app/finance/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'bc-view-journal-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-journal-view-page></bc-selected-journal-view-page>
  `,
})
export class ViewJournalViewPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromFinance.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new ViewJournalViewPageActions.SelectJournalView(+params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
