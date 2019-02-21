import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';

const routes: Routes = [
  { path: '', component: DashboardContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
