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
import { GetAuthContext, AuthActionTypes, GetAuthContextSuccess, GetAuthContextFailure, GetEntityType, GetEntityTypeSuccess, GetEntityTypeFailure } from '../actions';
import { UserDto, EntityTypeDto } from '../models';
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
export class AuthEffects {
  @Effect()
  GetAuthContext$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<GetAuthContext>(
        AuthActionTypes.GetAuthContext
      ),
      debounceTime(debounce, scheduler),
      switchMap(() => {       
        const nextSearch$ = this.actions$.pipe(
          ofType(AuthActionTypes.GetAuthContext),
          skip(1)
        );      
        return this.apiSerivce.get<UserDto>('account/users/authcontext').pipe(
          takeUntil(nextSearch$),
          map((authContext: UserDto) => new GetAuthContextSuccess(authContext)),
          catchError(err => of(new GetAuthContextFailure(err)))
        );
      })
    );

    @Effect()
    GetEntityType$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
      Action
    > =>
      this.actions$.pipe(
        ofType<GetEntityType>(
          AuthActionTypes.GetEntityType
        ),
        debounceTime(debounce, scheduler),
        switchMap(() => {       
          const nextSearch$ = this.actions$.pipe(
            ofType(AuthActionTypes.GetEntityType),
            skip(1)
          );      
          return this.apiSerivce.get<UserDto>('account/entitytypes').pipe(
            takeUntil(nextSearch$),
            map((entityTypeDtos: EntityTypeDto[]) => new GetEntityTypeSuccess(entityTypeDtos)),
            catchError(err => of(new GetEntityTypeFailure(err)))
          );
        })
      );

  constructor(
    private actions$: Actions,
    private apiSerivce: ApiService
  ) {}
}
