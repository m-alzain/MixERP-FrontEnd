import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JournalEntryDetailComponent } from 'src/app/finance/components/journal-entry-detail/journal-entry-detail.component';
import { JournalEntryListComponent } from 'src/app/finance/components/journal-entry-list/journal-entry-list.component';

import { MaterialModule } from 'src/app/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';

export const COMPONENTS = [
    JournalEntryDetailComponent,
    JournalEntryListComponent,      
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
