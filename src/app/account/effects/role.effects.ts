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
import { RoleDto } from 'src/app/shared/models';
import { GetRoles, RoleActionTypes, GetRolesSuccess, GetRolesFailure } from '../actions/role.actions';
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
export class RoleEffects {
  @Effect()
  GetRoles$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<GetRoles>(
        RoleActionTypes.GetRoles
      ),
      debounceTime(debounce, scheduler),  
      map(action => action.payload),    
      switchMap((officeId) => {       
        const nextSearch$ = this.actions$.pipe(
          ofType(RoleActionTypes.GetRoles),
          skip(1)
        );      
        return this.apiSerivce.get<RoleDto>(`account/roles/${officeId}`).pipe(
          takeUntil(nextSearch$),
          map((roles: RoleDto[]) => new GetRolesSuccess(roles)),
          catchError(err => of(new GetRolesFailure(err)))
        );
      })
    );

    // @Effect()
    // SaveUser$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    //   Action
    // > =>
    //   this.actions$.pipe(
    //     ofType<SaveUser>(
    //         RoleActionTypes.SaveUser
    //     ),
    //     debounceTime(debounce, scheduler),
    //     map(action => action.payload),
    //     switchMap((payload) => {       
    //       const nextSearch$ = this.actions$.pipe(
    //         ofType(RoleActionTypes.SaveUser),
    //         skip(1)
    //       );      
    //       return this.apiSerivce.post<UserDto>(`account/users/${payload.officeId}`,payload.userDto).pipe(
    //         takeUntil(nextSearch$),
    //         map((user: UserDto) => new SaveUserSuccess(user)),
    //         catchError(err => of(new SaveUserFailure(err)))
    //       );
    //     })
    //   );

    // @Effect()
    // UpdateUser$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    //   Action
    // > =>
    //   this.actions$.pipe(
    //     ofType<UpdateUser>(
    //         RoleActionTypes.UpdateUser
    //     ),
    //     debounceTime(debounce, scheduler),
    //     map(action => action.payload),
    //     switchMap((payload) => {       
    //       const nextSearch$ = this.actions$.pipe(
    //         ofType(RoleActionTypes.UpdateUser),
    //         skip(1)
    //       );      
    //       return this.apiSerivce.put<UserDto>(`account/users/${payload.officeId}`,payload.userDto).pipe(
    //         takeUntil(nextSearch$),
    //         map((user: UserDto) => new UpdateUserSuccess(user)),
    //         catchError(err => of(new UpdateUserFailure(err)))
    //       );
    //     })
    //   );

  constructor(
    private actions$: Actions,
    private apiSerivce: ApiService
  ) {}
}
