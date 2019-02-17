import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TenantDto } from 'src/app/shared/models';
import * as fromAccount from 'src/app/account/reducers';
import { GetTenant } from '../actions';

@Component({
  selector: 'account-tenant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `  
    <account-tenant-list
      [masterData]="tenants$  | async"
      [loading]="loading$  | async"
      [error]="error$  | async"  
      (search)="search()"      
      >
    </account-tenant-list>
   
  `,
})
export class FindTenantPageComponent {
    tenants$: Observable<TenantDto[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromAccount.State>) {
    this.tenants$ = store.pipe(select(fromAccount.getTenants));
    this.loading$ = store.pipe(select(fromAccount.getTenantLoading));
    this.error$ = store.pipe(select(fromAccount.getTenantError));
  }

  search() {
    this.store.dispatch(new GetTenant());
  }
}
