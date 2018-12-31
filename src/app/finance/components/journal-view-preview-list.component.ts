import { Component, Input } from '@angular/core';
import { JournalView } from '../models';

@Component({
  selector: 'bc-journal-view-preview-list',
  template: `
    <bc-journal-view-preview *ngFor="let journalView of JournalViews" [JournalView]="journalView"></bc-journal-view-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class JournalViewPreviewListComponent {
  @Input() JournalViews: JournalView[];
}
