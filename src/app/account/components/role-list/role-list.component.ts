
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AccessType, RoleDto, EntityTypeDto, GroupEntityAccessPolicyDto} from 'src/app/shared/models';
import * as fromRoot from 'src/app/reducers';
import * as fromAccount from 'src/app/account/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { Router, ActivatedRoute } from '@angular/router';

import { cloneModel, getENUM } from 'src/app/shared/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleDisplayPage, GetRoles, SelectRole, SelectRoleDisplayPage, ClearSelectedRole, SaveRole, UpdateRole, DeleteRole, ClearRoles } from '../../actions';
import { GetEntityType, SetEntityTypeSearchTerm } from 'src/app/auth/actions';
import { ValidatorFn, AbstractControlOptions, Validators } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/shared/services/can-deactivate.guard';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'account-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  roles$: Observable<RoleDto[]>; 
  loading$: Observable<boolean>;
  loading: boolean;
  error$: Observable<string>;
  selectedRole$: Observable<RoleDto>; 
  viewModel: RoleDto;
  selectedOfficeId$: Observable<string>;
  selectedOfficeId: string;
  selectedEntityTypePolicyAccessType$: Observable<AccessType>;
  selectedEntityTypePolicyAccessType: AccessType;
  isAdmin$: Observable<boolean>;
  isAdmin: boolean;
  roleDisplayPage$: Observable<RoleDisplayPage>;
  roleDisplayPage: RoleDisplayPage;
  validationError: string = '';

  public isEdit: boolean = false;
  private _editModel: RoleDto;

  private loadingSubscription: Subscription;
  private selectedRoleSubscription: Subscription;
  private selectedOfficeIdSubscription: Subscription;
  private roleDisplayPageSubscription: Subscription;
  private isAdminSubscription: Subscription;

  // entityTypes
  entityTypes$: Observable<EntityTypeDto[]>; 
  entityTypeLoading$: Observable<boolean>;
  entityTypeError$: Observable<string>;
  entityTypeFormatter: (entity: any) => string = (entity: any) => entity.EntityName
  onEntityTypeTerm(term : string){
    this.store.dispatch(new SetEntityTypeSearchTerm(term));
  }
  accessTypes: {key:any; value: any}[];

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute, public modalService: NgbModal) {
    this.roles$ = store.pipe(select(fromAccount.getRoles));
    this.loading$ = store.pipe(select(fromAccount.getRoleLoading));
    this.loading$.subscribe(a => this.loading = a);
    this.error$ = store.pipe(select(fromAccount.getRoleError));
    this.selectedRole$ = store.pipe(select(fromAccount.getSelectedRole));
    this.selectedRole$.subscribe(a => this.viewModel = a);
    this.selectedOfficeId$ = store.pipe(select(fromAuth.getSelectedOfficeId));
    this.selectedOfficeId$.subscribe(a => this.selectedOfficeId = a);
    this.roleDisplayPage$ = store.pipe(select(fromAccount.getRoleDisplayPage));
    this.roleDisplayPage$.subscribe(a => {this.roleDisplayPage = a;});
    this.selectedEntityTypePolicyAccessType$ =  store.pipe(select(fromAuth.getSelectedEntityTypePolicyAccessType));
    this.selectedEntityTypePolicyAccessType$.subscribe(a => this.selectedEntityTypePolicyAccessType = a);
    this.isAdmin$ = store.pipe(select(fromAuth.isAdmin));
    this.isAdmin$.subscribe(a => this.isAdmin = a);

    // entityTypes
    this.entityTypes$ = store.pipe(select(fromAuth.getSearchedEntityTypes));
    this.entityTypeLoading$ = store.pipe(select(fromAuth.getEntityTypeLoading));
    this.entityTypeError$ = store.pipe(select(fromAuth.getEntityTypeError));    
    // this.store.dispatch(new GetEntityType()); already been dispatched at the starting of the app
  }

  ngOnInit(){
    this.fetch();
    this.accessTypes = getENUM(AccessType);
    
  }

  getAccessTypeKey(v: any)
  {
    return this.accessTypes.find(a => a.value==v).key;
  }

  ngOnDestroy() { 
    if (!!this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (!!this.selectedRoleSubscription) {
      this.selectedRoleSubscription.unsubscribe();
    }
    if (!!this.selectedOfficeIdSubscription) {
      this.selectedOfficeIdSubscription.unsubscribe();
    }
    if (!!this.roleDisplayPageSubscription) {
      this.roleDisplayPageSubscription.unsubscribe();
    }
    if (!!this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }   
    
    this.store.dispatch(new ClearRoles());
  }

  fetch() {
    this.store.dispatch(new GetRoles(this.selectedOfficeId));
  } 

  onSelectRole(role: RoleDto){     
    if (this.isEdit) {
      const proceed = confirm('Your changes will be discarded, are you sure you would like to proceed?');
      if (proceed) {
        this._editModel = this.viewModel;
        this.isEdit = false;
        this.store.dispatch(new SelectRole(role)); 
      } 
    }else{
      this.store.dispatch(new SelectRole(role)); 
    }        
  }

  onSelectDetailsPage(){
    this.store.dispatch(new SelectRoleDisplayPage(RoleDisplayPage.Details));
  }
  
  onSelectPoliciesPage()
  {   
    this.store.dispatch(new SelectRoleDisplayPage(RoleDisplayPage.Policies));   
  }


  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isEdit) {
      const proceed = confirm('Your changes will be discarded, are you sure you would like to proceed?');
      if (proceed) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  get editModel() {
    return this._editModel;
  }

  get activeModel() {
    return this.isEdit ? this.editModel : this.viewModel;
  }


  get canCreate(): boolean {
    return !this.canUpdatePred || this.canUpdatePred();
  }
  get canEdit(): boolean {
    return !!this.activeModel && (!this.canUpdatePred || this.canUpdatePred());
  }
  get canDelete(): boolean {
    return !!this.viewModel && (!this.canUpdatePred || this.canUpdatePred());
  }
  canUpdatePred = () => {    
    //return (this.isAdmin || this.selectedEntityTypePolicyAccessType >= AccessType.EDIT); // CREATE, UPDATE, DELETE == EDIT
    return true;
  }
  get canSave(): boolean {    
    return !this.loading;
  }
  get canCancel(): boolean {
    return !this.loading;
  }

  onEdit(): void {
    if (!!this.viewModel && !this.isEdit) {
      // Clone the model (to allow for canceling changes)
      this._editModel = cloneModel(this.viewModel);
      this.isEdit = true;
    }
  }

  createNewModel = () => {
    const result = new RoleDto();  
    result.GroupEntityAccessPolicies = [];                 
    return result;
  }
  onCreate(): void {
    this.store.dispatch(new ClearSelectedRole());
    this.viewModel =  this.createNewModel();
    this._editModel = this.viewModel;
    this.isEdit = true;
    this.onSelectDetailsPage();
  } 
  onAddPolicy(): void {        
      const groupPolicy = new GroupEntityAccessPolicyDto(); 
      if (!this.activeModel.GroupEntityAccessPolicies) {
        this.activeModel.GroupEntityAccessPolicies = [];
      }      
      this.activeModel.GroupEntityAccessPolicies.push(groupPolicy);        
  }
  onDeletePolicy(index: number, role: RoleDto) {
    const policies = role.GroupEntityAccessPolicies;
    policies.splice(index, 1);
  }

  onSave(): void { 
    var roleValidation = !!this.activeModel.RoleName && this.activeModel.GroupEntityAccessPolicies.every(p => !!p.AccessType && !!p.EntityTypeId);
    if(!roleValidation)
    {
      this.validationError = 'You should fill all the required field';
    }else{
      this.validationError = '';
      const isNew = !(this._editModel.Id);    
      if (isNew) {   
        this.viewModel = this._editModel; // so that if there is an error the form data wont be cleared     
        this.store.dispatch(new SaveRole({roleDto: this._editModel, officeId: this.selectedOfficeId}));   
      } else {    
        this.store.dispatch(new UpdateRole({roleDto: this._editModel, officeId: this.selectedOfficeId})); 
      }
      this.isEdit = false;
    }
    
  }

  onDelete(): void { 
    this.store.dispatch(new DeleteRole({roleId: this.activeModel.Id, officeId: this.selectedOfficeId}));     
  }

  onRefresh(): void {    
    if (!this.loading) {
      this.fetch();
    }
  }

  onCancel(): void {    
    if (this.isEdit) {
      const proceed = confirm('Your changes will be discarded, are you sure you would like to proceed?');
      if (proceed) {
        this._editModel = this.viewModel;
        this.isEdit = false;
      } 
    }
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }

}
