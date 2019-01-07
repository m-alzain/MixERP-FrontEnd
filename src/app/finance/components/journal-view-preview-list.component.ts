import { Component, Input, OnInit } from '@angular/core';
import { JournalView } from '../models';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import {  Router }  from '@angular/router';

@Component({
  selector: 'bc-journal-view-preview-list',
  template: `
  <!--
    <bc-journal-view-preview *ngFor="let journalView of JournalViews" [JournalView]="journalView"></bc-journal-view-preview>
    -->

    <div class="example-container mat-elevation-z8">
      <table mat-table  [dataSource]="dataSource">

        <ng-container  matColumnDef="transactionMasterId">
            <th mat-header-cell *matHeaderCellDef >TranId</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.transactionMasterId}}</td>
        </ng-container>
        <ng-container  matColumnDef="transactionCode">
            <th mat-header-cell *matHeaderCellDef>TranCode</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.transactionCode}}</td>
        </ng-container>
        <ng-container  matColumnDef="book">
            <th mat-header-cell *matHeaderCellDef>Book</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.book}}</td>
        </ng-container>
        <ng-container  matColumnDef="valueDate">
            <th mat-header-cell *matHeaderCellDef>ValueDate</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.valueDate}}</td>
        </ng-container>        
        <ng-container matColumnDef="bookDate">
            <th mat-header-cell *matHeaderCellDef>BookDate</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.bookDate}}</td>
        </ng-container>
        <ng-container matColumnDef="referenceNumber">
            <th mat-header-cell *matHeaderCellDef>ReferenceNumber</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.referenceNumber}}</td>
        </ng-container>
        <ng-container matColumnDef="statementReference">
            <th mat-header-cell *matHeaderCellDef>StatementReference</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.statementReference}}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.amount}}</td>
        </ng-container>
        <ng-container matColumnDef="postedBy">
            <th mat-header-cell *matHeaderCellDef>PostedBy</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.postedBy}}</td>
        </ng-container>
        <ng-container matColumnDef="office">
            <th mat-header-cell *matHeaderCellDef>Office</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.office}}</td>
        </ng-container>
        <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.status}}</td>
        </ng-container>
        <ng-container matColumnDef="verifiedBy">
            <th mat-header-cell *matHeaderCellDef>VerifiedBy</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.verifiedBy}}</td>
        </ng-container>
        <ng-container matColumnDef="verifiedOn">
            <th mat-header-cell *matHeaderCellDef>VerifiedOn</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.verifiedOn}}</td>
        </ng-container>
        <ng-container matColumnDef="reason">
            <th mat-header-cell *matHeaderCellDef>Reason</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.reason}}</td>
        </ng-container>
        <ng-container matColumnDef="transactionTs">
            <th mat-header-cell *matHeaderCellDef>TransactionTs</th>
            <td mat-cell *matCellDef="let journalView">{{journalView.transactionTs}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>

        <tr mat-row *matRowDef="let row; columns: displayedColumns"  (dblclick)="onRowClicked(row)" ></tr>

    </table>
    </div>
  `,
  styles: [
    `
    :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    
      
    table.mat-table {
        min-width: auto !important;
        width: 100% !important;
        table-layout:fixed;
        overflow: auto;      
    }   
    
    th.mat-column-transactionMasterId, td.mat-column-transactionMasterId {       
        padding-right: 8px;
        padding-left: 8px;
    } 
    th.mat-column-transactionCode, td.mat-column-transactionCode {       
        padding-right: 8px;
        padding-left: 8px;
    } 
    th.mat-column-book, td.mat-column-book {    
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-valueDate, td.mat-column-valueDate {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-bookDate, td.mat-column-bookDate {       
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-referenceNumber, td.mat-column-referenceNumber {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-statementReference, td.mat-column-statementReference {       
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-amount, td.mat-column-amount {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-postedBy, td.mat-column-postedBy {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-office, td.mat-column-office {       
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-status, td.mat-column-status  {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-verifiedBy, td.mat-column-verifiedBy {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-verifiedOn, td.mat-column-verifiedOn {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-reason, td.mat-column-reason  {        
        padding-right: 8px;
        padding-left: 8px;
    }
    th.mat-column-transactionTs, td.mat-column-transactionTs {        
        padding-right: 8px;
        padding-left: 8px;
    }
    `,
  ],
})
export class JournalViewPreviewListComponent implements OnInit {
  @Input() journalViews$: Observable<JournalView[]>;

  displayedColumns: string[] = ['transactionMasterId', 'transactionCode', 'valueDate','bookDate',
  'status','verifiedOn',];
  dataSource : MatTableDataSource<JournalView>;

  constructor( private router: Router) {
  }

  ngOnInit() {
    this.journalViews$.subscribe( a=> this.dataSource = new  MatTableDataSource(a));
   
}

onRowClicked(row) {
    console.log('Row clicked: ', row);
    this.router.navigate(['/finance/journalviews', row.transactionMasterId]);
}

}
