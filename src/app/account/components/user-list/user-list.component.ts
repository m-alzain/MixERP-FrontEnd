
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto, AccessType, RoleDto} from 'src/app/shared/models';
import * as fromRoot from 'src/app/reducers';
import * as fromAccount from 'src/app/account/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { GetUsers, ClearSelectedUser, SelectUser, SelectUserDisplayPage, SaveUser, UpdateUser, UserDisplayPage, SetRoleTerm, GetRoles } from '../../actions';
import { cloneModel } from 'src/app/shared/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'account-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy, OnInit {
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


  // roles
  roles$: Observable<RoleDto[]>; 
  roleLoading$: Observable<boolean>;
  roleError$: Observable<string>;
  roleFormatter: (entity: any) => string = (entity: any) => entity.RoleName
  onRoleTerm(term : string){
    this.store.dispatch(new SetRoleTerm(term));
    console.log('roles = ', this.activeModel.Roles);
  }
  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute, public modalService: NgbModal) {
    this.users$ = store.pipe(select(fromAccount.getUsers));
    this.loading$ = store.pipe(select(fromAccount.getUserLoading));
    this.loading$.subscribe(a => this.loading = a);
    this.error$ = store.pipe(select(fromAccount.getUserError));
    this.selectedUser$ = store.pipe(select(fromAccount.getSelectedUser));
    this.selectedUser$.subscribe(a => this.viewModel = a);
    this.selectedOfficeId$ = store.pipe(select(fromAuth.getSelectedOfficeId));
    this.selectedOfficeId$.subscribe(a => this.selectedOfficeId = a);
    this.userDisplayPage$ = store.pipe(select(fromAccount.getUserDisplayPage));
    this.userDisplayPage$.subscribe(a => {this.userDisplayPage = a;});
    this.selectedEntityTypePolicyAccessType$ =  store.pipe(select(fromAuth.getSelectedEntityTypePolicyAccessType));
    this.selectedEntityTypePolicyAccessType$.subscribe(a => this.selectedEntityTypePolicyAccessType = a);
    this.isAdmin$ = store.pipe(select(fromAuth.isAdmin));
    this.isAdmin$.subscribe(a => this.isAdmin = a);

    // roles
    this.roles$ = store.pipe(select(fromAccount.getSearchedRoles));
    this.roleLoading$ = store.pipe(select(fromAccount.getRoleLoading));
    this.roleError$ = store.pipe(select(fromAccount.getRoleError));
    
    this.store.dispatch(new GetRoles(this.selectedOfficeId));
  }

  ngOnInit(){
    this.fetch();
  }

  ngOnDestroy() {  
    // considering creating clear action; if it is necessary.  
  }

  fetch() {
    this.store.dispatch(new GetUsers(this.selectedOfficeId));
  } 

  onSelectUser(user: UserDto){ 
    // clear if you are editing something ; this.onCancel() does not work      
    this.store.dispatch(new SelectUser(user));      
  }

  onSelectDetailsPage(){
    // this.router.navigate(['.', user.Id], { relativeTo: this.route });
    this.store.dispatch(new SelectUserDisplayPage(UserDisplayPage.Details));
  }
  
  onSelectRolesPage()
  {   
    this.store.dispatch(new SelectUserDisplayPage(UserDisplayPage.Roles));   
  }


  ////Details
  ////////-------------------------------------

  ///------------------
  public isEdit: boolean = false;
  private _editModel: UserDto;

  public canDeactivate(): boolean {
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

  // get showErrorMessage(): boolean {
  //   return this.detailsStatus === DetailsStatus.error;
  // }
  
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

      // Show the edit view
      // this.detailsStatus = DetailsStatus.edit;
      this.isEdit = true;
    }
  }

  createNewPred = () => {
    this.store.dispatch(new ClearSelectedUser());
  }
  createNewModel = () => {
    const result = new UserDto();
    const newRole = new RoleDto();
    if (result.Roles) {
      result.Roles = [];
    }      
    result.Roles.push(newRole);         
    return result;
  }
  onCreate(): void {
    this.createNewPred();
    this.viewModel =  this.createNewModel();
    this._editModel = this.viewModel;
    this.isEdit = true;
    this.onSelectDetailsPage();
  } 
  onAdd(): void {
    if (this.userDisplayPage == UserDisplayPage.Details)
    {
      this.createNewPred();
      this.viewModel =  this.createNewModel();
      this._editModel = this.viewModel;
      this.isEdit = true;
      // this.onSelectDetailsPage();
    }else{
      this.onEdit();      
      const newRole = new RoleDto();  // we only fill the roleId from detaillsPicker; so for now we count on the backend
      newRole.RoleName = '';
      if (!this.activeModel.Roles) {
        this.activeModel.Roles = [];
      }      
      this.activeModel.Roles.push(newRole);     
    }
    
  }

  onSave(): void { 
    const isNew = !(this._editModel.Id);    
    if (isNew) {   
      this.viewModel = this._editModel; // so that if there is an error the form data wont be cleared     
      // this.saveEvent.emit(this.editModel);   
      this.store.dispatch(new SaveUser({userDto: this._editModel, officeId: this.selectedOfficeId}));   
    } else {    
      // this.updateEvent.emit(this.editModel);
      this.store.dispatch(new UpdateUser({userDto: this._editModel, officeId: this.selectedOfficeId})); 
    }
    this.isEdit = false;
  }

  onDelete(): void {   
    // this.deleteEvent.emit(this.id);
  }

  // onAddRole(user: UserDto) {
  //   const newRole = new RoleDto();
  //   newRole.RoleName = '';
  //   if (!user.Roles) {
  //     user.Roles = [];
  //   }
  //   user.Roles.push(newRole);
  // }
  
  // onDeleteRole(index: number, userDto: UserDto) {
  //   const lines = userDto.Roles;
  //   lines.splice(index, 1);
  // }

  // get showDelete(): boolean {
  //   // Some entities do not have a delete API
  //   // in this case hide the delete button
  //   return !!this.data[this.controller].delete;
  // }

  onRefresh(): void {    
    if (!this.loading) {
      this.fetch();
    }
  }

  onCancel(): void {    
    const isNew = !(this._editModel.Id);

    if (isNew) {
      // To avoid null reference errors this.viewModel can not be set to null.
      //  ----             check for deactivation
      

      // To avoid a confirmation modal
      // this.detailsStatus = DetailsStatus.loaded;

      // Navigate back to the last screen
      // this.location.back();     
    } else {      
      // this._errorMessage = null;
     
      // Close the edit form
      // this.detailsStatus = DetailsStatus.loaded;
    }
    this._editModel = null;
    this.isEdit = false;
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }

}
