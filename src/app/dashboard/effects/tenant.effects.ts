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


import { ApiService } from 'src/app/shared/services/api.services';
import { TenantDto } from 'src/app/shared/models';
import { GetTenant, TenantActionTypes, GetTenantSuccess, GetTenantFailure } from '../actions';
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
export class TenantEffects {
  @Effect()
  GetTenant$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<GetTenant>(
        TenantActionTypes.GetTenant
      ),
      debounceTime(debounce, scheduler),
      switchMap(() => {       
        const nextSearch$ = this.actions$.pipe(
          ofType(TenantActionTypes.GetTenant),
          skip(1)
        );      
        return this.apiSerivce.get<TenantDto>('account/user/tenants').pipe(
          takeUntil(nextSearch$),
          map((tenants: TenantDto[]) => new GetTenantSuccess(tenants)),
          catchError(err => of(new GetTenantFailure(err)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private apiSerivce: ApiService
  ) {}
}
