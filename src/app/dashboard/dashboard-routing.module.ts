import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindTenantPageComponent } from './containers/find-tenant-page.component';

const routes: Routes = [
  { path: '', component: FindTenantPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
