import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JournalViewDetailComponent } from 'src/app/finance/components/journal-view-detail.component';
import { JournalViewPreviewListComponent } from 'src/app/finance/components/journal-view-preview-list.component';
import { JournalViewSearchComponent } from 'src/app/finance/components/journal-view-search.component';
import { SelectedJournalViewPageComponent } from 'src/app/finance/components/selected-journal-view-page.component';

import { MaterialModule } from 'src/app/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';

export const COMPONENTS = [
    JournalViewDetailComponent,
    JournalViewPreviewListComponent,   
    JournalViewSearchComponent,
    SelectedJournalViewPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    
    FontAwesomeModule,

    SharedModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
