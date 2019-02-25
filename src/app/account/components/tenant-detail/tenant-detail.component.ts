import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { DetailsComponent } from 'src/app/shared/layouts';

import { Observable } from 'rxjs'
import { TenantDto, OfficeDto, AccessType } from 'src/app/shared/models';

import * as fromRoot from 'src/app/reducers';
import * as fromAccount from 'src/app/account/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { ClearSelectedTenant, UpdateTenant, SaveTenant } from '../../actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'account-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit {

  @ViewChild(DetailsComponent)
  details: DetailsComponent;

  tenant: TenantDto; 
  tenant$: Observable<TenantDto>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  // selectedTenantOffices$: Observable<OfficeDto[]>; 
  isAdmin$: Observable<boolean>;
  isAdmin: boolean;
  selectedEntityTypePolicyAccessType$: Observable<AccessType>;
  selectedEntityTypePolicyAccessType: AccessType;

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {
    this.tenant$ = store.pipe(select(fromAccount.getSelectedTenant));
    this.tenant$.subscribe(tenant => 
      {              
        if(!tenant)
        {
          this.tenant = this.createNewModel();                        
        }else{
          this.tenant = tenant;
        }
      }
    ); 
    this.loading$ = store.pipe(select(fromAccount.getTenantLoading));
    this.error$ = store.pipe(select(fromAccount.getTenantError));
    // this.selectedTenantOffices$ = store.pipe(select(fromAccount.getSelectedTenantOffices));
    this.isAdmin$ = store.pipe(select(fromAuth.isAdmin));
    this.selectedEntityTypePolicyAccessType$ = store.pipe(select(fromAuth.getSelectedEntityTypePolicyAccessType));
    this.isAdmin$.subscribe(a => this.isAdmin = a);
    this.selectedEntityTypePolicyAccessType$.subscribe(a => this.selectedEntityTypePolicyAccessType = a);
  }

  canDeactivate(): boolean {
    return this.details.canDeactivate();
  }

  ngOnInit(){    
  } 

  search (model : any){
    console.log('search has been called');
  }
  save (tenant : TenantDto){
    this.store.dispatch(new SaveTenant(tenant));
  } 

  update (tenant : TenantDto){
    this.store.dispatch(new UpdateTenant(tenant));
  } 
  delete (model : any){
    console.log('delete has been called');
  }
  

  canUpdatePred = () => {    
    //return (this.isAdmin || this.selectedEntityTypePolicyAccessType >= AccessType.EDIT); // CREATE, UPDATE, DELETE == EDIT
    return true;
  }

  createNewPred = () => {
    this.store.dispatch(new ClearSelectedTenant());
  }
  createNewModel = () => {
    const result = new TenantDto();   
    result.RegistrationDate = new Date().toISOString();
    // result.Offices = [new OfficeDto()]; 
    result.Offices = [];    

    return result;
  }

  onAddOffice(tenant: TenantDto) {
    const newOffice = new OfficeDto();
    // newLine['isNew'] = true; // This focuses the new line

    if (!tenant.Offices) {
      tenant.Offices = [];
    }

    tenant.Offices.push(newOffice);
  }

  onDeleteOffice(index: number, tenant: TenantDto) {
    const lines = tenant.Offices;
    lines.splice(index, 1);
  }

  onFocusOut(li: OfficeDto) {
    // if(!li.Product && !li.Quantity)
    console.log('Focus Out!');
  }

  isVisibleTable(model: TenantDto) {
    // return model.Reason === 'PR';

    return true;
  }

}
