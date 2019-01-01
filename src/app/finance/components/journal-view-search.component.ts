import { Component, Output, Input, EventEmitter } from '@angular/core';
import { JournalViewQuery } from '../models';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'bc-journal-view-search',
  template: `
    <mat-card>
      <mat-card-title>Find a JournalView</mat-card-title>
      <mat-card-content>       
        <form class="row" [formGroup]="JournalViewForm" (ngSubmit)="onSubmit()">

        <!--
          <mat-form-field>
            <input matInput placeholder="Search for a journal view" [value]="query?.TranCode" (keyup)="search.emit($event.target.value)">
          </mat-form-field>
          -->

          <!--
          <mat-form-field>
            <input matInput [matDatepicker]="FromDatepicker"  placeholder="From" title="From"  formControlName="FromInputDate">
            <mat-datepicker-toggle matSuffix [for]="FromDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #FromDatepicker></mat-datepicker>
          </mat-form-field>        
          -->

          <mat-form-field>
          <input  matInput data-persist placeholder="From" title="From" type="date" formControlName="FromInputDate">
          </mat-form-field>

          <mat-form-field>
          <input  matInput data-persist placeholder="To" title="To" type="date" formControlName="ToInputDate">
          </mat-form-field>
          
          <mat-form-field>
            <input matInput placeholder="TranId"  title="TranId" type="text" formControlName="TranIdInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="TranCode"  title="TranCode" type="text" formControlName="TranCodeInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="ReferenceNumber"  title="ReferenceNumber" type="text" formControlName="ReferenceNumberInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="StatementReference"  title="StatementReference" type="text" formControlName="StatementReferenceInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="PostedBy"  title="PostedBy" type="text" formControlName="PostedByInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Amount"  title="Amount" type="number" formControlName="AmountInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Office"  title="Office" type="text" formControlName="OfficeInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Status"  title="Status" type="text" formControlName="StatusInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="VerifiedBy"  title="VerifiedBy" type="text" formControlName="VerifiedByInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Reason"  title="Reason" type="text" formControlName="ReasonInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="UserId"  title="UserId" type="text" formControlName="UserIdInputText">
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="OfficeId"  title="OfficeId" type="text" formControlName="OfficeIdInputText">
          </mat-form-field>

          <button mat-raised-button class="btn btn-primary" type="submit" [disabled]="!JournalViewForm.valid">Show</button>
        </form>
        <mat-spinner [class.show]="searching" [diameter]="30" [strokeWidth]="3"></mat-spinner>
        
      </mat-card-content>
      <mat-card-footer><span *ngIf="error">{{error}}</span></mat-card-footer>
      
    </mat-card>
  `,
  styles: [
    `
      mat-card-title,
      
      mat-card-footer {
        display: flex;
        justify-content: center;
      }

      mat-card-footer {
        color: #ff0000;
        padding: 5px 0;
      }

      .mat-form-field {
        min-width: 300px;
        margin-left: 10px;
        margin-right: 10px; // Make room for the spinner
      }

      .mat-spinner {
        position: relative;
        top: 10px;
        left: 10px;
        visibility: hidden;
      }

      .mat-spinner.show {
        visibility: visible;
      }
    `,
  ],
})
export class JournalViewSearchComponent {

  constructor(private fb: FormBuilder){
      
  }
  @Input() query: JournalViewQuery;
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<JournalViewQuery>();

  JournalViewForm = this.fb.group({

    FromInputDate :[''],
    ToInputDate : [''],
    TranIdInputText : [''],
    TranCodeInputText : [''],
    ReferenceNumberInputText : [''],
    StatementReferenceInputText : [''],
    PostedByInputText : [''],

    AmountInputText : [''],
    OfficeInputText : [''],
    StatusInputText : [''],
    VerifiedByInputText : [''],
    ReasonInputText : [''],
    UserIdInputText : [''],
    OfficeIdInputText : ['']
});


  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.search.emit( {
      From : this.JournalViewForm.get('FromInputDate').value,
      To : this.JournalViewForm.get('ToInputDate').value,
      TranId : this.JournalViewForm.get('TranIdInputText').value,
      TranCode : this.JournalViewForm.get('TranCodeInputText').value,
      ReferenceNumber : this.JournalViewForm.get('ReferenceNumberInputText').value,
      StatementReference : this.JournalViewForm.get('StatementReferenceInputText').value,
      PostedBy : this.JournalViewForm.get('PostedByInputText').value,
      Amount : this.JournalViewForm.get('AmountInputText').value,
      Office : this.JournalViewForm.get('OfficeInputText').value,
      Status : this.JournalViewForm.get('StatusInputText').value,
      VerifiedBy : this.JournalViewForm.get('VerifiedByInputText').value,
      Reason : this.JournalViewForm.get('ReasonInputText').value,
      UserId : this.JournalViewForm.get('UserIdInputText').value,
      OfficeId : this.JournalViewForm.get('OfficeIdInputText').value,
      Book: ''
    } );
    console.warn(this.JournalViewForm.value);
  }
}
