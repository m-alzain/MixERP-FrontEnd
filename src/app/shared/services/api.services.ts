import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { friendly } from './../utilities';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import * as fromAuth from 'src/app/auth/reducers';

@Injectable()
export class ApiService {
  authorizationHeaderValue: string;
  authorizationHeaderValue$ : Observable<string>;
  constructor(
    private http: HttpClient, private store: Store<fromRoot.State>
  ) {
    this.authorizationHeaderValue$ = store.pipe(select(fromAuth.getAuthorizationHeaderValue));
    this.authorizationHeaderValue$.subscribe(a => this.authorizationHeaderValue = a);
  }
  
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authorizationHeaderValue
      }
     ),
     params: params
    };  
    console.log('from api service',  this.authorizationHeaderValue );
    return this.http.get<T>(`${environment.apiRoot}${path}`, httpOptions)
      .pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
      );
  }

  put<T>(path: string, body: Object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authorizationHeaderValue
      })
    };  
    return this.http.put<T>(
      `${environment.apiRoot}${path}`,
      JSON.stringify(body), httpOptions
    ).pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
    );
  }

  post<T>(path: string, body: Object = {}): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authorizationHeaderValue
      })
    };  
    return this.http.post<T>(
      `${environment.apiRoot}${path}`,
      JSON.stringify(body),httpOptions
    ).pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
    );
  }

  delete<T>(path): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authorizationHeaderValue
      }
     )
    };  
    return this.http.delete<T>(
      `${environment.apiRoot}${path}`, httpOptions
    ).pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
    );
  }
}
