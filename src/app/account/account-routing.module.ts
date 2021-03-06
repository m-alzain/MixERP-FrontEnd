import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { TenantDetailComponent } from './components/tenant-detail/tenant-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { CanDeactivateGuard } from '../shared/services/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'tenants', component: TenantListComponent },
      {
        path: 'tenants/:id',
        component: TenantDetailComponent,
      },
      { path: 'users', component: UserListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'roles', component: RoleListComponent, canDeactivate: [CanDeactivateGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
