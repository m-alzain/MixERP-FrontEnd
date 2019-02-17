import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/api';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/reducers'
import * as fromAuth from 'src/app/auth/reducers'
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/services/auth.service';
import { OfficeDto, EntityTypeDto } from '../shared/models';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  selectedOfficeId$: Observable<string>;
  offices$: Observable<OfficeDto[]>;
  entityTypeDtos$: Observable<EntityTypeDto[]>;

  //userProfile: UserProfile;
  firstLogin = false;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog,
    private _authService: AuthService,
    private _router: Router
    ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.offices$ = this.store.pipe(select(fromAuth.getOffices));
    this.selectedOfficeId$ = this.store.pipe(select(fromAuth.getSelectedOfficeId));
    this.entityTypeDtos$ = this.store.pipe(select(fromAuth.getEntityTypes));
    
  }
    
  onSelectOffice(officeId: string)
  {
    this._authService.onSelectOffice(officeId);
  }

  onSelectEntityType(entity: EntityTypeDto){
    this._authService.onSelectEntityType(entity);
  }
  isAdmin() {
    return true;
    //return this._authService.authContext && this._authService.authContext.claims && (this._authService.authContext.claims.find(c => c.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' && c.value === 'Admin'));
  }
  
  ngOnInit() {
      
  }

  ///////////////////////////////////////// From BSharpUnilever
  // For the menu
  public isCollapsed = false;

  onToggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onCollapse() {
    this.isCollapsed = true;
  }

  onLogOut() {
    this._authService.logout();
  }
  onLogIn() {
    this._authService.login();
  }

  get currentUserFullName() {
    //return this.globals.currentUser.FullName;
    return 'CurrentUser';
  }

  get currentUserRole() {
    //return this.globals.currentUser.Role;
    return 'CurrentUserRole';
  }

  get canViewData(): boolean {
    // return this.globals.currentUser.Role === 'Manager' ||
    //   this.globals.currentUser.Role === 'Administrator';
    return true;
  }

}
