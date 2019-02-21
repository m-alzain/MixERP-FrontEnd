import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromRoot from 'src/app/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OfficeDto } from 'src/app/shared/models';

@Component({
  selector: 'account-tenant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `  
    <dashboard-dashboard
      [office]="selectedOffice$  | async"     
      >
    </dashboard-dashboard>
   
  `,
})

export class DashboardContainerComponent implements OnInit {

  selectedOffice$: Observable<OfficeDto>;

  constructor(private store: Store<fromRoot.State>,) {
    this.selectedOffice$ = this.store.pipe(select(fromAuth.getSelectedOffice));
   }

  ngOnInit() {
  }

}
