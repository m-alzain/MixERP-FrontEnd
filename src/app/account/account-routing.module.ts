import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { TenantDetailComponent } from './components/tenant-detail/tenant-detail.component';

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
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
