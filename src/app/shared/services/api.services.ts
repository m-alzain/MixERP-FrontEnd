import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { friendly } from './../utilities';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get<T>(`${environment.apiRoot}${path}`, { params })
      .pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiRoot}${path}`,
      JSON.stringify(body)
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
        'Content-Type':  'application/json'
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

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiRoot}${path}`
    ).pipe(
        catchError((error) => {
            const friendlyError = friendly(error);
            return throwError(friendlyError);
          })
    );
  }
}
