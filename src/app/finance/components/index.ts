import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JournalViewDetailComponent } from 'src/app/finance/components/journal-view-detail.component';
import { JournalViewPreviewListComponent } from 'src/app/finance/components/journal-view-preview-list.component';
import { JournalViewPreviewComponent } from 'src/app/finance/components/journal-view-preview.component';
import { JournalViewSearchComponent } from 'src/app/finance/components/journal-view-search.component';
import { SelectedJournalViewPageComponent } from 'src/app/finance/components/selected-journal-view-page.component';

import { MaterialModule } from 'src/app/material';

export const COMPONENTS = [
    JournalViewDetailComponent,
    JournalViewPreviewListComponent,
    JournalViewPreviewComponent,
    JournalViewSearchComponent,
    SelectedJournalViewPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
