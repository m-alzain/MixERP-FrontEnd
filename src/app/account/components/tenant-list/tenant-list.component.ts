
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TenantDto, OfficeDto } from 'src/app/shared/models';
import * as fromRoot from 'src/app/reducers';
import * as fromAccount from 'src/app/account/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { GetTenants, SelectTenant, ClearSelectedTenant } from 'src/app/account/actions';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'account-tenant-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnDestroy,  OnInit {

  tenants$: Observable<TenantDto[]>; 
  loading$: Observable<boolean>;
  error$: Observable<string>;
  selectedTenantOffices$: Observable<OfficeDto[]>; 
  isAdmin$: Observable<boolean>;
  isAdmin: boolean;

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {
    this.tenants$ = store.pipe(select(fromAccount.getTenants));
    this.loading$ = store.pipe(select(fromAccount.getTenantLoading));
    this.error$ = store.pipe(select(fromAccount.getTenantError));
    this.selectedTenantOffices$ = store.pipe(select(fromAccount.getSelectedTenantOffices));
    this.isAdmin$ = store.pipe(select(fromAuth.isAdmin));
    this.isAdmin$.subscribe(a => this.isAdmin = a);
  }

  ngOnInit(){
    this.fetch();
  }

  ngOnDestroy() {  
    // considering creating clear action; if it is necessary.  
  }

  fetch() {
    this.store.dispatch(new GetTenants());
  }
 

  idFun(model : TenantDto){
      return model.Id;
  }   

  get canCreateTenant() {
    //return this.isAdmin
    return true;
  }
  get canCreateOffice() {
    return this.isAdmin
  }

  onOfficeCreate(){

  }
  onTenantCreate(){
    // clear the selected tenant
    this.store.dispatch(new ClearSelectedTenant());
    this.router.navigate(['.', 'new'], { relativeTo: this.route });
  }
  goToDetail(tenant: TenantDto){
    this.router.navigate(['.', tenant.Id], { relativeTo: this.route });
  }
  onSelectTenant(tenant: TenantDto){
    this.store.dispatch(new SelectTenant(tenant));
  }

  onSelectOffice(tenant: TenantDto){
    
  }

}
