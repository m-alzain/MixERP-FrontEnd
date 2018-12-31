import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindJournalViewPageComponent,ViewJournalViewPageComponent } from './containers'

const routes: Routes = [
  { path: 'journalviews', component: FindJournalViewPageComponent },
  {
    path: 'journalviews/:id',
    component: ViewJournalViewPageComponent,
    //canActivate: [BookExistsGuard],
  },
  // {
  //   path: 'tasks/journal/view', component: CollectionPageComponent
  // },
  // { path: 'find', component: FindBookPageComponent },
  // {
  //   path: ':id',
  //   component: ViewBookPageComponent,
  //   canActivate: [BookExistsGuard],
  // },
  // { path: '', component: CollectionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
