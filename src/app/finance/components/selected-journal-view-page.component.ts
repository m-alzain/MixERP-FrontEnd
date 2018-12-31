import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromFinance from 'src/app/finance/reducers';
import { SelectedJournalViewPageActions } from 'src/app/finance/actions';
import { JournalView } from 'src/app/finance/models';

@Component({
  selector: 'bc-selected-journal-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-journal-view-detail
      [JournalView]="journalView$ | async">
      
    </bc-journal-view-detail>
  `,
})
export class SelectedJournalViewPageComponent {
  journalView$: Observable<JournalView>;
  //isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromFinance.State>) {
    this.journalView$ = store.pipe(select(fromFinance.getSelectedJournalView));
    this.journalView$.subscribe(      
      j => console.log(j)
      );
    // this.isSelectedBookInCollection$ = store.pipe(
    //   select(fromFinance.isSelectedBookInCollection)
    // );
  }

//   addToCollection(book: Book) {
//     this.store.dispatch(new SelectedBookPageActions.AddBook(book));
//   }

//   removeFromCollection(book: Book) {
//     this.store.dispatch(new SelectedBookPageActions.RemoveBook(book));
//   }
}
