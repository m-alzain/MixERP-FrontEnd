import { Component, Input, Output, EventEmitter, OnDestroy, ViewChild, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromFinance from 'src/app/finance/reducers';

import { DetailsComponent } from 'src/app/shared/layouts';
import { JournalEntryDto, JournalEntryLineDto } from 'src/app/finance/models'
import { cloneModel } from 'src/app/shared/utilities';

import { Observable } from 'rxjs'
import { EntryState } from 'src/app/shared/models';

@Component({
  selector: 'finance-journal-entry-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:  './journal-entry-detail.component.html',
  styleUrls: [  './journal-entry-detail.component.scss']
})
export class JournalEntryDetailComponent implements OnDestroy, OnInit {

  @ViewChild(DetailsComponent)
  details: DetailsComponent;

  public showSpinner = false;
  
  journalEntry: JournalEntryDto;
  journalEntry$: Observable<JournalEntryDto>;
  
  constructor(private store: Store<fromFinance.State>) {
    this.journalEntry$ = store.pipe(select(fromFinance.getSelectedJournalEntry));
    this.journalEntry$.subscribe(j => 
        {    
          // always send to the detail component a new object     
          if(!j)
          {
            this.journalEntry = this.createNew();                        
          }else{
            this.journalEntry = {...j}
          }
        }
      ); 
  }


  ngOnDestroy() {
    // this.notifyDestruct$.next();
  }

  canDeactivate(): boolean {
    return this.details.canDeactivate();
  }

  ngOnInit(){
    // 
  }
  loading: boolean = false;
  error: string = '';
  hasDeleteApi: boolean = true;
  

  search (model : any){
    console.log('search has been called');
  }
  save (model : any){
    console.log('save has been called');
  }
  update (model : any){
    console.log('update has been called');
  } 
  delete (model : any){
    console.log('delete has been called');
  }
  createNew = () => {
    const result = new JournalEntryDto();   
    result.BookDate = new Date().toISOString();
    result.JournalEntryLines = [new JournalEntryLineDto()];   

    return result;
  }

  enableEditButton = (model: JournalEntryDto) => {
    // for now just return true; in the future can be changed to check the record permission
    return true;
  }

  // get reasons() {
  //   return Object.keys(supportRequestReasons).map(key =>
  //     ({ value: key, display: supportRequestReasons[key] }));
  // }

  // reasonDisplay(key: string): string {
  //   return !!key ? supportRequestReasons[key] : '';
  // }

  // onDownloadCreditNote(cn: GeneratedDocument) {
  //   this.showSpinner = true;
  //   this.data.supportrequests.getGeneratedDocument(cn.Id, this.notifyDestruct$).subscribe(
  //     (blob: Blob) => {
  //       this.showSpinner = false;
  //       const serial = new SerialPipe().transform(cn.SerialNumber, 'CN');
  //       const fileName = `${serial} ${new Date().toDateString()}.pdf`;
  //       downloadBlob(blob, fileName);
  //     },
  //     () => {
  //       this.showSpinner = false;
  //       this.details.showModalError('Could not download the file, please contact your IT department');
  //     }
  //   );
  // }

  onAddLine(model: JournalEntryDto) {
    const newLine = new JournalEntryLineDto();
    newLine['isNew'] = true; // This focuses the new line

    if (!model.JournalEntryLines) {
      model.JournalEntryLines = [];
    }

    model.JournalEntryLines.push(newLine);
  }

  onDeleteLine(index: number, model: JournalEntryDto) {

    const lines = model.JournalEntryLines;
    lines.splice(index, 1);
  }

  onFocusOut(li: JournalEntryLineDto) {
    // if(!li.Product && !li.Quantity)
    console.log('Focus Out!');
  }

  isVisibleSubmit(model: JournalEntryDto): boolean {
    // const currentRole = this.globals.currentUser.Role;
    // return !!model.Id &&
    //   [SupportRequestState.Draft].includes(model.State) &&
    //   ['KAE', 'Administrator'].includes(currentRole);

    // return !!model.TransactionMasterId

    // for now asume that every one can submit
    return false;
  }

  onSubmit(model: JournalEntryDto) {

    this.goToState(model, EntryState.Submitted);
  }

  isVisibleApprove(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return !!model.Id &&
    //   [SupportRequestState.Draft, SupportRequestState.Submitted].includes(model.State) &&
    //   ['Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Approve
    return false;
  }

  onApprove(model: JournalEntryDto) {
    this.goToState(model, EntryState.Approved);
  }

  isVisibleReject(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   [SupportRequestState.Submitted].includes(model.State) &&
    //   ['Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return false;
  }

  onReject(model: JournalEntryDto) {
    this.goToState(model, EntryState.Rejected);
  }

  isVisiblePost(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   ([SupportRequestState.Approved].includes(model.State) ||
    //     ([SupportRequestState.Draft].includes(model.State) && model.Reason === 'FB')) &&
    //   ['KAE', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return true;
  }

  onPost(model: JournalEntryDto) {
    this.goToState(model, EntryState.Posted);
  }

  isVisibleUnReject(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   [SupportRequestState.Rejected].includes(model.State) &&
    //   ['Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return false;
  }

  onUnReject(model: JournalEntryDto) {
    this.goToState(model, EntryState.Submitted);
  }

  isVisibleCancel(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   [SupportRequestState.Draft].includes(model.State) &&
    //   ['KAE', 'Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return false;
  }

  onCancel(model: JournalEntryDto) {
    this.goToState(model, EntryState.Canceled);
  }

  isVisibleUnCancel(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   [SupportRequestState.Canceled].includes(model.State) &&
    //   ['KAE', 'Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return false;
  }

  onUnCancel(model: JournalEntryDto) {
    this.goToState(model, EntryState.Draft);
  }

  isVisibleUnPost(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;

    // return !!model.Id &&
    //   [SupportRequestState.Posted].includes(model.State) &&
    //   ['KAE', 'Manager', 'Administrator'].includes(currentRole);

    // for now asume that every one can do Reject
    return false;
  }

  onUnPost(model: JournalEntryDto) {
    // use any message for now untill we implement the functionality in the back end
    const confirmed = confirm('This action will invalidate the generated credit note, are you sure you want to proceed?');
    if (confirmed) {
      // const stateChanges = model.StateChanges;
      // const previousState = stateChanges[stateChanges.length - 1].FromState;
      // this.goToState(model, previousState);

      console.log('the unpost is done');
    }
  }

  isVisibleReturn(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // const approved = SupportRequestState.Approved;
    // const submitted = SupportRequestState.Submitted;


    // return !!model.Id &&
    //   (model.State === approved && ['KAE', 'Administrator'].includes(currentRole)) ||
    //   (model.State === submitted && ['Manager', 'Administrator'].includes(currentRole));

    // for now asume that every one can do Return
    return false;
  }

  onReturn(model: JournalEntryDto) {
    const previousState = EntryState.Draft;

    this.goToState(model, previousState);
  }

  isDraft(model): boolean {
    return model.State === 'Draft';
  }

  isVisibleHeaderRequestedValue(model: JournalEntryDto) {
    // return ['DC', 'PS'].includes(model.Reason);
    return true;
  }

  isVisibleHeaderApprovedValue(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return ['DC', 'PS'].includes(model.Reason) && this.isVisibleApprovedValue(model);
    return true;
  }

  isVisibleHeaderUsedValue(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return (model.Reason === 'FB' &&
    //   model.State === SupportRequestState.Draft &&
    //   ['Administrator', 'KAE'].includes(currentRole)) ||
    //   (['DC', 'PS'].includes(model.Reason) && this.isVisibleUsedValue(model));

    return true;
  }

  isVisibleRequestedSupport(model: JournalEntryDto) {
    return true;
  }

  isVisibleRequestedValue(model: JournalEntryDto) {
    return true;
  }

  isVisibleApprovedSupport(model: JournalEntryDto) {
    return this.isVisibleApprovedValue(model);
  }

  isVisibleApprovedValue(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;



    // return !(currentRole === 'KAE' && model.State === SupportRequestState.Submitted) &&
    //   ((['Administrator', 'Manager'].includes(currentRole) && model.State === SupportRequestState.Draft) ||
    //     [SupportRequestState.Submitted, SupportRequestState.Approved,
    //       SupportRequestState.Rejected, SupportRequestState.Posted].includes(model.State));

    return true;
  }

  isVisibleUsedSupport(model: JournalEntryDto) {
    return this.isVisibleUsedValue(model);
  }

  isVisibleUsedValue(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return (model.State === SupportRequestState.Approved && ['Administrator', 'KAE'].includes(currentRole)) ||
    //   model.State === SupportRequestState.Posted;

    return true;
  }

  isVisibleTable(model: JournalEntryDto) {
    // return model.Reason === 'PR';

    return true;
  }

  onRequestedSupportChange(li: JournalEntryLineDto) {
    // li.RequestedValue = li.RequestedSupport * li.Quantity;
  }

  onApprovedSupportChange(li: JournalEntryLineDto) {
    // li.ApprovedValue = li.ApprovedSupport * li.Quantity;
  }

  onUsedSupportChange(li: JournalEntryLineDto) {
    // li.UsedValue = li.UsedSupport * li.Quantity;
  }

  onQuantityChange(li: JournalEntryLineDto) {
    this.onRequestedSupportChange(li);
    this.onApprovedSupportChange(li);
    this.onUsedSupportChange(li);
  }

  onReasonChange(newVal: any, model: JournalEntryDto) {
    // const oldVal = model.Reason;
    // model.Reason = null;

    // if (oldVal !== 'PR' && newVal === 'PR') {
    //   model.LineItems = [];
    // } else if (oldVal === 'PR' && newVal !== 'PR') {
    //   model.LineItems = [];
    //   model.LineItems.push(new JournalEntryLineDto());
    // }

    // model.Reason = newVal;
  }

  isEditableAccountExecutive(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return ['Manager', 'Administrator'].includes(currentRole) && model.State === SupportRequestState.Draft;

    return true;
  }

  isEditableManager(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return model.State === SupportRequestState.Draft || (currentRole === 'Administrator' && model.State !== SupportRequestState.Submitted);

    return true;
  }

  isEditableHeaderRequestedValue(model: JournalEntryDto) {
    return this.isEditableRequestedSupport(model);
  }

  isEditableHeaderApprovedValue(model: JournalEntryDto) {
    return this.isEditableApprovedSupport(model);
  }

  isEditableHeaderUsedValue(model: JournalEntryDto) {
    return this.isEditableUsedSupport(model);
  }

  isEditableRequestedSupport(model: JournalEntryDto) {
    // return model.State === SupportRequestState.Draft;
    return true;
  }

  isEditableApprovedSupport(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return ['Manager', 'Administrator'].includes(currentRole) &&
    //   [SupportRequestState.Draft, SupportRequestState.Submitted].includes(model.State);

    return true;
  }

  isEditableUsedSupport(model: JournalEntryDto) {
    // const currentRole = this.globals.currentUser.Role;
    // return ['KAE', 'Administrator'].includes(currentRole) &&
    //   [SupportRequestState.Draft, SupportRequestState.Submitted, SupportRequestState.Approved].includes(model.State);

    return true;
  }

  private goToState(model: JournalEntryDto, state: EntryState) {
    const clone = cloneModel(model);

    // raise event to dispatch the post action
    // now the only state we have is post

    // clone.State = state;
    // this.data.supportrequests.post(clone, this.notifyDestruct$).pipe(
    //   map((result: any) => {
    //     this.details.viewModel = result;
    //   }),
    //   catchError(friendlyError => {
    //     this.details.showModalError(friendlyError);
    //     return of(null);
    //   })
    // ).subscribe();
  }
}
