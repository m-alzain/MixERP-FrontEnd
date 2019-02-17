import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

import * as fromRoot from 'src/app/reducers';
import * as fromAuth from 'src/app/auth/reducers';

import { UserDto, OfficeDto, GroupEntityAccessPolicyDto, RoleDto, AccessType } from 'src/app/shared/models';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  authContext$: Observable<UserDto>;
  offices$: Observable<OfficeDto[]>;
  selectedOfficRole$: Observable<RoleDto>;
  selectedEntityTypePolicy$: Observable<AccessType>;
  selectedEntityTypeId$: Observable<string>;

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
    this.authContext$ = this.store.pipe(select(fromAuth.getAuthContext));
    this.offices$ = this.store.pipe(select(fromAuth.getOffices)); 
    this.selectedOfficRole$ = this.store.pipe(select(fromAuth.getSelectedOfficRole));
    this.selectedEntityTypePolicy$ = this.store.pipe(select(fromAuth.getSelectedEntityTypePolicy)); // getSelectedEntityTypeId
    this.selectedEntityTypeId$ = this.store.pipe(select(fromAuth.getSelectedEntityTypeId));
    this.selectedOfficRole$.subscribe( a => 
      {
        console.log('role = ',a)
      }     
    ); 
    this.selectedEntityTypePolicy$.subscribe( a => 
      {
        console.log('policy = ',a)
      }     
    ); 
    this.selectedEntityTypeId$.subscribe( a => 
      {
        console.log('selectedEntityTypeId = ',a)
      }     
    );    
  }
      

  ngOnInit() {
        
  }

  onLogOut() {
    this._authService.logout();
  }
  onLogIn() {
    this._authService.login();
  }

  onSelectOffice(officeId: string)
  {
    this._authService.onSelectOffice(officeId);
  }
}
