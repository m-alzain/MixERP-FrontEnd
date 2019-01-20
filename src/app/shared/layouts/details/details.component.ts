import { Component, OnInit, Input, TemplateRef, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { cloneModel } from '../../utilities';

// enum DetailsStatus {

//   // The details record is being fetched from the server
//   //loading = 1,

//   // The last fetch of the details record from the server completed successfully
//   //loaded = 2,

//   // The last fetch of details record from the server resulted in an error
//   //error = 3,

//   // The details record is set to be modified or is currently being modified
//   edit = 4,
// }

@Component({
  selector: 'b-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private id: string; 
  // private detailsStatus: DetailsStatus;
  public isEdit: boolean

  @ViewChild('errorModal')
  errorModal: TemplateRef<any>;
  private _modalErrorMessage: string = null;

  @Input() loading: boolean;
  @Input() error: string;
  @Input() hasDeleteApi: boolean;
  @Input() viewModel: any;
  private _editModel: any;
  @Output() refreshEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() saveEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();

  @Input()
  masterCrumb: string;

  @Input()
  detailsCrumb: TemplateRef<any>;

  @Input()
  secondToolbarTemplate: TemplateRef<any>;

  @Input()
  viewEditTemplate: TemplateRef<any>;

  @Input()
  sidebarTemplate: TemplateRef<any>;

  @Input()
  canUpdatePred: () => boolean;

  // @Input()
  // enableEditButtonPred: (model: any) => boolean = () => true

  // @Input()
  // createNew: () => any = () => ({})

  constructor(
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if(this.id == 'new')
      {    
        this.id = null;  
        this.onEdit(); // ready to create new object
      }
    });
  }

  ngOnDestroy() {
    // to cancel any pending backend calls
    // this.notifyDestruct$.next();
  }

  // private fetch() {
  //   // this.notifyFetch$.next();    
  // }

  // private doFetch(): Observable<void> {
  //   if (this.id === 'new') {
  //     // IF it's create new, don't fetch anything
  //     this._editModel = this.createNew();
  //     this.detailsStatus = DetailsStatus.edit;

  //     return of();
  //   } else {
  //     // ELSE fetch the record from server

  //     this.detailsStatus = DetailsStatus.loading;

  //     return this.data[this.controller].get(this.id, this.notifyDestruct$).pipe(
  //       tap((result: any) => {

  //         this._viewModel = result;
  //         this.detailsStatus = DetailsStatus.loaded;
  //       }),
  //       catchError((friendlyError) => {

  //         this.detailsStatus = DetailsStatus.error;
  //         this._errorMessage = friendlyError;

  //         return of(null);
  //       })
  //     );
  //   }
  // }

  public canDeactivate(): boolean {
    if (this.isEdit) {
      const proceed = confirm('Your changes will be discarded, are you sure you would like to proceed?');
      if (proceed) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  public showModalError(errorMessage: string) {
    // Shows the error message in a dismissable modal
    this._modalErrorMessage = errorMessage;
    this.modalService.open(this.errorModal);
  }

  ////// UI Bindings

  // get errorMessage() {
  //   return this._errorMessage;
  // }

  get modalErrorMessage() {
    return this._modalErrorMessage;
  }

  // get viewModel() {
  //   return this._viewModel;
  // }

  // set viewModel(val: any) {
  //   this._viewModel = val;
  // }

  get editModel() {
    return this._editModel;
  }

  get activeModel() {
    return this.isEdit ? this.editModel : this.viewModel;
  }

  // get showSpinner(): boolean {
  //   return this.detailsStatus === DetailsStatus.loading;
  // }

  get showViewEdit(): boolean {
    // return this.detailsStatus === DetailsStatus.loaded || this.detailsStatus === DetailsStatus.edit;
    return !this.loading || this.isEdit;
  }

  // get isEdit(): boolean {
  //   return this.detailsStatus === DetailsStatus.edit;
  // }

  get showViewToolbar(): boolean {
    return !this.showEditToolbar;
  }

  get showEditToolbar(): boolean {
    return this.isEdit
  }

  // get showErrorMessage(): boolean {
  //   return this.detailsStatus === DetailsStatus.error;
  // }

  onEdit(): void {
    if (this.viewModel) {
      // Clone the model (to allow for canceling changes)
      this._editModel = cloneModel(this.viewModel);

      // Show the edit view
      // this.detailsStatus = DetailsStatus.edit;
      this.isEdit = true;
    }
  }

  get canEdit(): boolean {
    return (!this.canUpdatePred || this.canUpdatePred());
  }

  onCreate(): void {
    this.router.navigate(['..', 'new'], { relativeTo: this.route });

  }

  get canCreate(): boolean {
    return !this.canUpdatePred || this.canUpdatePred();
  }

  onDelete(): void {   
    this.deleteEvent.emit(this.id);
  }

  get canDelete(): boolean {
    return !!this.viewModel && (!this.canUpdatePred || this.canUpdatePred());
  }

  // get showDelete(): boolean {
  //   // Some entities do not have a delete API
  //   // in this case hide the delete button
  //   return !!this.data[this.controller].delete;
  // }

  onRefresh(): void {
    // if (this.detailsStatus !== DetailsStatus.loading) {

    //   // Clear the cache and fetch again
    //   this._viewModel = null;
    //   this.fetch();
    // }
    if (!this.loading) {
      this.refreshEvent.emit(this.id);
    }
  }

  onSave(): void {
    // We need this information for later
    const isNew = !(this.id);    

    // Prepare the post observable
    // this.data[this.controller].post(this.editModel, this.notifyDestruct$).pipe(
    //   map((result: any) => {

    //     // update the details with the server version
    //     this._viewModel = result;
    //     this._editModel = null;
    //     this._errorMessage = null;

    //     if (isNew) {
    //       this.detailsStatus = DetailsStatus.loaded;
    //       this.router.navigate(['..', result.Id], { relativeTo: this.route });

    //     } else {
    //       this.detailsStatus = DetailsStatus.loaded;
    //     }
    //   }),
    //   catchError(friendlyError => {

    //     // Show the error in a dismissable modal
    //     this.showModalError(friendlyError);
    //     return of(null);
    //   })
    // ).subscribe();

    if (isNew) {     
      this.saveEvent.emit(this.editModel);      
    } else {    
      this.updateEvent.emit(this.editModel);
    }

  }

  get canSave(): boolean {
    // return !this.data.isSaving;
    return !this.loading;
  }

  onCancel(): void {
    // Remove the edit model
    const isNew = !(this.id);

    if (isNew) {

      // To avoid null reference errors
      this.viewModel = this._editModel;

      // To avoid a confirmation modal
      // this.detailsStatus = DetailsStatus.loaded;

      // Navigate back to the last screen
      this.location.back();

    } else {
      this._editModel = null;
      // this._errorMessage = null;

      // Close the edit form
      // this.detailsStatus = DetailsStatus.loaded;
    }
  }

  get canCancel(): boolean {
    // return !this.data.isSaving;
    return !this.loading;
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }
}
