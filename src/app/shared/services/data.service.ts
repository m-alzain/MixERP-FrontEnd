import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { ListResult } from './../models';
import { takeUntil, catchError, tap, finalize, map } from 'rxjs/operators';
import { friendly } from './../utilities';
// import { User } from './entities/User';
// import { Store } from './entities/Store';
// import { Product } from './entities/Product';
// import { SupportRequest } from './entities/SupportRequest';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public isSaving = false;

  constructor(private http: HttpClient) { }

  // Users
  // public users = {
  //   getAll: this.getAllFactory<User>('users'),
  //   get: this.getFactory<User>('users'),
  //   post: this.postFactory<User>('users'),
  //   delete: this.deleteFactory<User>('users'),
  //   getCurrent: (cancellationToken$: Observable<void>) =>
  //     this.getFactory<User>('users')('current', cancellationToken$)
  // };

  // Stores
  // public stores = {
  //   getAll: this.getAllFactory<Store>('stores'),
  //   get: this.getFactory<Store>('stores'),
  //   post: this.postFactory<Store>('stores'),
  //   delete: this.deleteFactory<Store>('stores')
  // };

  // Products
  // public products = {
  //   getAll: this.getAllFactory<Product>('products'),
  //   get: this.getFactory<Product>('products'),
  //   post: this.postFactory<Product>('products'),
  //   delete: this.deleteFactory<Product>('products')
  // };

  // Support Requests
  // public supportrequests = {
  //   getAll: this.getAllFactory<SupportRequest>('supportrequests'),
  //   get: this.getFactory<SupportRequest>('supportrequests'),
  //   post: this.postFactory<SupportRequest>('supportrequests'),
  //   getData: (cancellationToken$: Observable<void>) => {
  //     const url = `api/supportrequests/data`;
  //     const obs$ = this.http.get(url, { responseType: 'blob' }).pipe(
  //       catchError((error) => {
  //         const friendlyError = friendly(error);
  //         return throwError(friendlyError);
  //       }),
  //       takeUntil(cancellationToken$),
  //       takeUntil(this.auth.signedOut$)
  //     );
  //     return obs$;
  //   },
  //   getGeneratedDocument: (id: number, cancellationToken$: Observable<void>) => {
  //     const url = `api/supportrequests/generateddocuments/${id}`;
  //     const obs$ = this.http.get(url, { responseType: 'blob' }).pipe(
  //       catchError((error) => {
  //         const friendlyError = friendly(error);
  //         return throwError(friendlyError);
  //       }),
  //       takeUntil(cancellationToken$),
  //       takeUntil(this.auth.signedOut$)
  //     );
  //     return obs$;
  //   }
  // };

  // Factory methods so as not to repeat ourselves
  private getAllFactory<T>(controller: string) {
    return (top: number, skip: number, orderBy: string, desc: boolean, search: string,
      cancellationToken$: Observable<void>, includeInactive: boolean = false) => {

      // Prepare the URL
      const paramsArray: string[] = [
        `top=${top}`,
        `skip=${skip}`
      ];

      if (!!search) {
        // Encode in case the user enters special URI characters like &
        paramsArray.push(`search=${encodeURIComponent(search)}`);
      }

      if (!!orderBy) {
        paramsArray.push(`orderBy=${orderBy}`);
        paramsArray.push(`desc=${!!desc}`);
      }
      if (includeInactive) {
        paramsArray.push(`includeInactive=${includeInactive}`);
      }

      const params: string = paramsArray.join('&');
      const url = `api/${controller}?${params}`;

      const obs$ = this.http.get<ListResult<T>>(url).pipe(
        catchError((error) => {
          const friendlyError = friendly(error);
          return throwError(friendlyError);
        }),
        takeUntil(cancellationToken$),
        // takeUntil(this.auth.signedOut$),
      );

      return obs$;
    };
  }

  private getFactory<T>(controller: string) {
    return (id: any, cancellationToken$: Observable<void>) => {
      const url = `api/${controller}/${id}`;

      const obs$ = this.http.get<T>(url).pipe(
        catchError((error) => {
          const friendlyError = friendly(error);
          return throwError(friendlyError);
        }),
        takeUntil(cancellationToken$),
        // takeUntil(this.auth.signedOut$)
      );

      return obs$;
    };
  }

  private postFactory<T>(controller: string) {
    return (entity: T, cancellationToken$: Observable<void>) => {
      this.isSaving = true;
      const obs$ = this.http.post<T>(`api/${controller}`, entity, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        tap(() => this.isSaving = false),
        catchError((error) => {
          this.isSaving = false;
          const friendlyError = friendly(error);
          return throwError(friendlyError);
        }),
        takeUntil(cancellationToken$),
        // takeUntil(this.auth.signedOut$),
        finalize(() => this.isSaving = false)
      );

      return obs$;
    };
  }

  private deleteFactory<T>(controller: string) {
    return (id: any, cancellationToken$: Observable<void>) => {
      this.isSaving = true;
      const url = `api/${controller}/${id}`;

      const obs$ = this.http.delete(url).pipe(
        tap(() => this.isSaving = false),
        catchError((error) => {
          const friendlyError = friendly(error);
          return throwError(friendlyError);
        }),
        takeUntil(cancellationToken$),
        // takeUntil(this.auth.signedOut$),
        finalize(() => this.isSaving = false)
      );

      return obs$;
    };
  }
}
