import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, EMPTY as empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

//import { GoogleBooksService } from '@example-app/core/services/google-books.service';
import { SearchJournalEntry, JournalEntryActionTypes, JournalEntrySearchSuccess, JournalEntrySearchFailure } from 'src/app/finance/actions';
import { JournalEntryDto } from 'src/app/finance/models';
import { ApiService } from 'src/app/shared/services/api.services';
/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class JournalEntryEffects {
  @Effect()
  search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<SearchJournalEntry>(
        JournalEntryActionTypes.SearchJournalEntry
      ),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query == null) {
          return empty;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(JournalEntryActionTypes.SearchJournalEntry),
          skip(1)
        );

        return this.apiSerivce.post<JournalEntryDto>('finance/tasks/journal/view',query).pipe(
          takeUntil(nextSearch$),
          map((journalEntries: JournalEntryDto[]) => new JournalEntrySearchSuccess(journalEntries)),
          catchError(err => of(new JournalEntrySearchFailure(err)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private apiSerivce: ApiService
  ) {}
}
