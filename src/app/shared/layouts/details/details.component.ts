import { Component, OnInit, Input, TemplateRef, ViewChild, OnDestroy, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { cloneModel } from '../../utilities';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'b-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private id: string; 
  public isEdit: boolean = false;

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

  @Input()
  createNewPre: () => any = () => ({})

  @Input()
  createNewModel: () => any 

  constructor(
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if(this.id == 'new' && this.canEdit)
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

  get editModel() {
    return this._editModel;
  }

  get activeModel() {
    return this.isEdit ? this.editModel : this.viewModel;
  }

  get showViewEdit(): boolean {
    // return this.detailsStatus === DetailsStatus.loaded || this.detailsStatus === DetailsStatus.edit;
    return !this.loading || this.isEdit;
  }

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
    if (!!this.viewModel) {
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
    this.createNewPre();
    this.viewModel = !!this.createNewModel ? this.createNewModel() : this.viewModel;
    this._editModel = this.viewModel;
    this.router.navigate(['..', 'new'], { relativeTo: this.route });
    console.log('editmodel = ', this._editModel);
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
    if (!this.loading) {
      this.refreshEvent.emit(this.id);
    }
  }

  onSave(): void { 
    const isNew = !(this.id);    
    if (isNew) {   
      this.viewModel = this._editModel; // so that if there is an error the form data wont be cleared     
      this.saveEvent.emit(this.editModel);      
    } else {    
      this.updateEvent.emit(this.editModel);
    }
    this.isEdit = false;
  }

  get canSave(): boolean {    
    return !this.loading;
  }

  onCancel(): void {    
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
      this.isEdit = false;
      // this._errorMessage = null;

      // Close the edit form
      // this.detailsStatus = DetailsStatus.loaded;
    }
  }

  get canCancel(): boolean {
    return !this.loading;
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }
}
