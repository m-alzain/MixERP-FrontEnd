import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import * as fromAuth from 'src/app/auth/reducers';
import { AccessType } from 'src/app/shared/models';


@Injectable()
export class AuthGuard implements CanActivate {
    loggedIn$: Observable<boolean>;
    selectedEntityTypePolicyAccessType$: Observable<AccessType>;
    loggedIn: boolean;
    selectedEntityTypePolicyAccessType: AccessType;
    

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
  ) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.selectedEntityTypePolicyAccessType$ = this.store.pipe(select(fromAuth.getSelectedEntityTypePolicyAccessType));
    this.loggedIn$.subscribe(l => this.loggedIn = l); 
    this.selectedEntityTypePolicyAccessType$.subscribe(l => this.selectedEntityTypePolicyAccessType = l);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (this.loggedIn && (this.selectedEntityTypePolicyAccessType > -1) ) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/welcome']);
    return false;

  }
}