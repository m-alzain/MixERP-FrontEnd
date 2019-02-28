
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserDto, AccessType, RoleDto} from 'src/app/shared/models';
import * as fromRoot from 'src/app/reducers';
import * as fromAccount from 'src/app/account/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { GetUsers, ClearSelectedUser, SelectUser, SelectUserDisplayPage, SaveUser, UpdateUser, UserDisplayPage, SetRoleSearchTerm, GetRoles, AddExistingUserToggle, AddExistingUser, ClearUsers, DeleteOfficeUser } from '../../actions';
import { cloneModel } from 'src/app/shared/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanComponentDeactivate } from 'src/app/shared/services/can-deactivate.guard';


@Component({
  selector: 'account-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy, OnInit , CanComponentDeactivate{
  users$: Observable<UserDto[]>; 
  loading$: Observable<boolean>;
  loading: boolean;
  error$: Observable<string>;
  selectedUser$: Observable<UserDto>; 
  viewModel: UserDto;
  selectedOfficeId$: Observable<string>;
  selectedOfficeId: string;
  selectedEntityTypePolicyAccessType$: Observable<AccessType>;
  selectedEntityTypePolicyAccessType: AccessType;
  isAdmin$: Observable<boolean>;
  isAdmin: boolean;
  userDisplayPage$: Observable<UserDisplayPage>;
  userDisplayPage: UserDisplayPage;
  isAddingExistingUser$: Observable<boolean>;
  isAddingExistingUser: boolean;
  validationError: string = '';
  

  public isEdit: boolean = false;
  private _editModel: UserDto;

  private loadingSubscription: Subscription;
  private selectedUserSubscription: Subscription;
  private selectedOfficeIdSubscription: Subscription;
  private userDisplayPageSubscription: Subscription;
  private selectedEntityTypePolicyAccessTypeSubscription: Subscription;
  private isAdminSubscription: Subscription;
  private isAddingExistingUserSubscription: Subscription;

  // roles
  roles$: Observable<RoleDto[]>; 
  roleLoading$: Observable<boolean>;
  roleError$: Observable<string>;
  roleFormatter: (entity: any) => string = (entity: any) => entity.RoleName
  onRoleTerm(term : string){
    this.store.dispatch(new SetRoleSearchTerm(term));
  }
  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute, public modalService: NgbModal) {   
  }

  ngOnInit(){
    this.users$ = this.store.pipe(select(fromAccount.getUsers));
    this.loading$ = this.store.pipe(select(fromAccount.getUserLoading));
    this.loadingSubscription = this.loading$.subscribe(a => this.loading = a);    
    this.error$ = this.store.pipe(select(fromAccount.getUserError));
    this.selectedUser$ = this.store.pipe(select(fromAccount.getSelectedUser));
    this.selectedUserSubscription = this.selectedUser$.subscribe(a => this.viewModel = a);
    this.selectedOfficeId$ = this.store.pipe(select(fromAuth.getSelectedOfficeId));
    this.selectedOfficeIdSubscription = this.selectedOfficeId$.subscribe(a => this.selectedOfficeId = a);
    this.userDisplayPage$ = this.store.pipe(select(fromAccount.getUserDisplayPage));
    this.userDisplayPageSubscription = this.userDisplayPage$.subscribe(a => {this.userDisplayPage = a;});
    this.selectedEntityTypePolicyAccessType$ =  this.store.pipe(select(fromAuth.getSelectedEntityTypePolicyAccessType));
    this.selectedEntityTypePolicyAccessTypeSubscription = this.selectedEntityTypePolicyAccessType$.subscribe(a => this.selectedEntityTypePolicyAccessType = a);
    this.isAdmin$ = this.store.pipe(select(fromAuth.isAdmin));
    this.isAdminSubscription = this.isAdmin$.subscribe(a => this.isAdmin = a);
    this.isAddingExistingUser$ = this.store.pipe(select(fromAccount.isAddingExistingUser));
    this.isAddingExistingUserSubscription = this.isAddingExistingUser$.subscribe(a => this.isAddingExistingUser = a);

    // roles
    this.roles$ = this.store.pipe(select(fromAccount.getSearchedRoles));
    this.roleLoading$ = this.store.pipe(select(fromAccount.getRoleLoading));
    this.roleError$ = this.store.pipe(select(fromAccount.getRoleError));
    
    this.store.dispatch(new GetRoles(this.selectedOfficeId));

    this.fetch();
  }

  ngOnDestroy() {  
    
    if (!!this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (!!this.selectedUserSubscription) {
      this.selectedUserSubscription.unsubscribe();
    }
    if (!!this.selectedOfficeIdSubscription) {
      this.selectedOfficeIdSubscription.unsubscribe();
    }
    if (!!this.userDisplayPageSubscription) {
      this.userDisplayPageSubscription.unsubscribe();
    }
    if (!!this.selectedEntityTypePolicyAccessTypeSubscription) {
      this.selectedEntityTypePolicyAccessTypeSubscription.unsubscribe();
    } 
    if (!!this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    } 
    if (!!this.isAddingExistingUserSubscription) {
      this.isAddingExistingUserSubscription.unsubscribe();
    }  
    
    this.store.dispatch(new ClearUsers());
  }

  fetch() {
    this.store.dispatch(new GetUsers(this.selectedOfficeId));
  } 

  onSelectUser(user: UserDto){     
    if (this.isEdit) {
      const proceed = confirm('Your changes will be discarded, are you sure you would like to proceed?');
      if (proceed) {
        this._editModel = this.viewModel;
        this.isEdit = false;
        this.store.dispatch(new SelectUser(user));
      } 
    }else{
      this.store.dispatch(new SelectUser(user));
    }   
  }

  onSelectDetailsPage(){
    this.store.dispatch(new SelectUserDisplayPage(UserDisplayPage.Details));
  }
  
  onSelectRolesPage()
  {   
    this.store.dispatch(new SelectUserDisplayPage(UserDisplayPage.Roles));   
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
      this._editModel = cloneModel(this.viewModel);
      this.isEdit = true;
    }
  }

  createNewModel = () => {
    const result = new UserDto();
    result.Roles = [];
    return result;
  }
  onCreate(): void {
    this.store.dispatch(new ClearSelectedUser());
    this.viewModel =  this.createNewModel();
    this._editModel = this.viewModel;
    this.isEdit = true;
    this.onSelectDetailsPage();
  } 
  onAdd(): void {
    if (this.userDisplayPage == UserDisplayPage.Details)
    {// prepare to add existing user
      this.store.dispatch(new ClearSelectedUser());
      this.viewModel =  this.createNewModel();
      this._editModel = this.viewModel;
      this.isEdit = true;
      this.store.dispatch(new AddExistingUserToggle(true));     
    }else{  
      const newRole = new RoleDto();  // we only fill the roleId from detaillsPicker; so for now we count on the backend
      if (!this.activeModel.Roles) {
        this.activeModel.Roles = [];
      }      
      this.activeModel.Roles.push(newRole);     
    }    
  }

  onSave(): void { 
    var userValidation = !!this.activeModel.Email && this.activeModel.Roles.every(r => !!r.Id);
    if(!userValidation)
    {
      this.validationError = 'You should fill all the required field';
    }else{
      this.validationError = '';
      const isNew = !(this._editModel.Id);    
      if (isNew) {   
        this.viewModel = this._editModel; // so that if there is an error the form data wont be cleared  
        if(this.isAddingExistingUser)   
        {
          this.store.dispatch(new AddExistingUser({userDto: this._editModel, officeId: this.selectedOfficeId}));
        }  else{
          this.store.dispatch(new SaveUser({userDto: this._editModel, officeId: this.selectedOfficeId}));   
        }             
      } else {           
        this.store.dispatch(new UpdateUser({userDto: this._editModel, officeId: this.selectedOfficeId})); 
      }
      this.isEdit = false;     
    }
  }

  onDelete(): void { 
    this.store.dispatch(new DeleteOfficeUser({userId: this.activeModel.Id, officeId: this.selectedOfficeId}));     
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
        this._editModel = null;
        this.isEdit = false;
        this.store.dispatch(new AddExistingUserToggle(false));  
      } 
    }
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }

}
