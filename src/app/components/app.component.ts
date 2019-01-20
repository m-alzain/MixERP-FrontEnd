import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  firstLogin = false;

  constructor(    
    private _router: Router
    ) {   
    
  }


  toggleSidenav( close:boolean = true ){
    
  }
  
  login() {
    //this._authService.login();
  }

  logout() {
    //this._authService.logout();
  }

  isLoggedIn() {
    //return this._authService.isLoggedIn();
    return true;
  }

  isAdmin() {
    return true;
    //return this._authService.authContext && this._authService.authContext.claims && (this._authService.authContext.claims.find(c => c.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' && c.value === 'Admin'));
  }
  // ngOnInit() {
  //   // if (window.location.href.indexOf('?postLogout=true') > 0) {
  //   //   this._authService.signoutRedirectCallback().then(() => {
  //   //     let url: string = this._router.url.substring(
  //   //       0,
  //   //       this._router.url.indexOf('?')
  //   //     );
  //   //     this._router.navigateByUrl(url);
  //   //   });
  //   // }
  // }

  items: MenuItem[];

  ngOnInit() {
      this.items = [{
          label: 'Finance',
          items: [
              {label: 'Journal Entries', icon: 'pi pi-fw pi-plus'},
          ]
      },
      {
          label: 'Dashboard',
          items: [
              {label: 'Dashboard', icon: 'pi pi-fw pi-user-plus'},
          ]
      }];
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

  onSignOut() {
    //this.auth.signOutAndChallengeUser();
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
