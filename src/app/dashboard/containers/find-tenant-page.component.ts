import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TenantDto } from 'src/app/shared/models';
import * as fromDashboard from 'src/app/dashboard/reducers';
import { GetTenant } from '../actions';

@Component({
  selector: 'dashboard-tenant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `  
    <dashboard-tenant-list
      [masterData]="tenants$  | async"
      [loading]="loading$  | async"
      [error]="error$  | async"  
      (search)="search()"      
      >
    </dashboard-tenant-list>
   
  `,
})
export class FindTenantPageComponent {
    tenants$: Observable<TenantDto[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromDashboard.State>) {
    this.tenants$ = store.pipe(select(fromDashboard.getTenants));
    this.loading$ = store.pipe(select(fromDashboard.getTenantLoading));
    this.error$ = store.pipe(select(fromDashboard.getTenantError));
  }

  search() {
    this.store.dispatch(new GetTenant());
  }
}
