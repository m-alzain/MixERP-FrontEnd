import { Component, Input } from '@angular/core';
import { JournalView } from '../models';

@Component({
  selector: 'bc-journal-view-preview',
  template: `
    <a [routerLink]="['/finance/journalviews', id]">
    
      <mat-card>
        <mat-card-title-group>
        <!--
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          -->
          <mat-card-title>{{ id }}</mat-card-title>
          <mat-card-subtitle *ngIf="status">{{ status }}</mat-card-subtitle>        
        </mat-card-title-group>

        <mat-card-content>
          <p *ngIf="status">{{ status  }}</p>
        </mat-card-content>
        <mat-card-footer>
        <!--
          <bc-book-authors [book]="book"></bc-book-authors>
          -->
          <p *ngIf="transactionCode">{{ transactionCode  }}</p>
        </mat-card-footer>
      </mat-card>
      
    </a>
  `,
  styles: [
    `
      :host {
        display: flex;
      }

      :host a {
        display: flex;
      }

      mat-card {
        width: 400px;
        margin: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }

      @media only screen and (max-width: 768px) {
        mat-card {
          margin: 15px 0 !important;
        }
      }
      mat-card:hover {
        box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.5);
      }
      mat-card-title {
        margin-right: 10px;
      }
      mat-card-title-group {
        margin: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin-top: 15px;
        margin: 15px 0 0;
      }
      span {
        display: inline-block;
        font-size: 13px;
      }
      mat-card-footer {
        padding: 0 25px 25px;
      }
    `,
  ],
})
export class JournalViewPreviewComponent {
  @Input() JournalView: JournalView;

  get id() {
    return this.JournalView.transactionMasterId;
  }

  get status() {
    return this.JournalView.status;
  }

  get transactionCode() {
    return this.JournalView.transactionCode;
  }
//   get title() {
//     return this.journalView.volumeInfo.title;
//   }

//   get subtitle() {
//     return this.journalView.volumeInfo.subtitle;
//   }

//   get description() {
//     return this.journalView.volumeInfo.description;
//   }

//   get thumbnail(): string | boolean {
//     if (this.journalView.volumeInfo.imageLinks) {
//       return this.journalView.volumeInfo.imageLinks.smallThumbnail.replace(
//         'http:',
//         ''
//       );
//     }

//     return false;
//   }
}
