import { Injectable } from '@angular/core';
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
import { UserDto } from 'src/app/shared/models';
import { GetUsers, UserActionTypes, GetUsersSuccess, GetUsersFailure, SaveUser, SaveUserSuccess, SaveUserFailure, UpdateUser, UpdateUserSuccess, UpdateUserFailure } from '../actions';
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
export class UserEffects {
  @Effect()
  GetUsers$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<GetUsers>(
        UserActionTypes.GetUsers
      ),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap((officeId) => {       
        const nextSearch$ = this.actions$.pipe(
          ofType(UserActionTypes.GetUsers),
          skip(1)
        );      
        return this.apiSerivce.get<UserDto>(`account/office/users/${officeId}`).pipe(
          takeUntil(nextSearch$),
          map((users: UserDto[]) => new GetUsersSuccess(users)),
          catchError(err => of(new GetUsersFailure(err)))
        );
      })
    );

    @Effect()
    SaveUser$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
      Action
    > =>
      this.actions$.pipe(
        ofType<SaveUser>(
            UserActionTypes.SaveUser
        ),
        debounceTime(debounce, scheduler),
        map(action => action.payload),
        switchMap((payload) => {       
          const nextSearch$ = this.actions$.pipe(
            ofType(UserActionTypes.SaveUser),
            skip(1)
          );      
          return this.apiSerivce.post<UserDto>(`account/users/${payload.officeId}`,payload.userDto).pipe(
            takeUntil(nextSearch$),
            map((user: UserDto) => new SaveUserSuccess(user)),
            catchError(err => of(new SaveUserFailure(err)))
          );
        })
      );

    @Effect()
    UpdateUser$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
      Action
    > =>
      this.actions$.pipe(
        ofType<UpdateUser>(
            UserActionTypes.UpdateUser
        ),
        debounceTime(debounce, scheduler),
        map(action => action.payload),
        switchMap((payload) => {       
          const nextSearch$ = this.actions$.pipe(
            ofType(UserActionTypes.UpdateUser),
            skip(1)
          );      
          return this.apiSerivce.put<UserDto>(`account/users/${payload.officeId}`,payload.userDto).pipe(
            takeUntil(nextSearch$),
            map((user: UserDto) => new UpdateUserSuccess(user)),
            catchError(err => of(new UpdateUserFailure(err)))
          );
        })
      );

  constructor(
    private actions$: Actions,
    private apiSerivce: ApiService
  ) {}
}
