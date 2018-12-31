import { Component, OnInit, Input, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { cloneModel } from '../../utilities';

enum DetailsStatus {

  // The details record is being fetched from the server
  loading = 1,

  // The last fetch of the details record from the server completed successfully
  loaded = 2,

  // The last fetch of details record from the server resulted in an error
  error = 3,

  // The details record is set to be modified or is currently being modified
  edit = 4,
}

@Component({
  selector: 'b-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private notifyFetch$ = new Subject();
  private notifyDestruct$ = new Subject<void>();
  private id: string;
  private _errorMessage: string = null;
  private _modalErrorMessage: string = null;
  private _viewModel: any;
  private _editModel: any;
  private detailsStatus: DetailsStatus;

  @ViewChild('errorModal')
  errorModal: TemplateRef<any>;

  @Input()
  controller: string;

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

  @Input()
  enableEditButtonPred: (model: any) => boolean = () => true

  @Input()
  createNew: () => any = () => ({})

  constructor(public modalService: NgbModal,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {

    // When the notifyFetch subject fires, cancel existing backend
    // call and dispatch a new backend call
    this.notifyFetch$.pipe(
      switchMap(() => this.doFetch())
    ).subscribe();
  }

  ngOnInit() {

    // When the URI 'id' parameter changes, clear the screen and fetch the new record
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.fetch();
    });
  }

  ngOnDestroy() {
    // to cancel any pending backend calls
    this.notifyDestruct$.next();
  }

  private fetch() {
    this.notifyFetch$.next();
  }

  private doFetch(): Observable<void> {
    if (this.id === 'new') {
      // IF it's create new, don't fetch anything
      this._editModel = this.createNew();
      this.detailsStatus = DetailsStatus.edit;

      return of();
    } else {
      // ELSE fetch the record from server

      this.detailsStatus = DetailsStatus.loading;

      return this.data[this.controller].get(this.id, this.notifyDestruct$).pipe(
        tap((result: any) => {

          this._viewModel = result;
          this.detailsStatus = DetailsStatus.loaded;
        }),
        catchError((friendlyError) => {

          this.detailsStatus = DetailsStatus.error;
          this._errorMessage = friendlyError;

          return of(null);
        })
      );
    }
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

  get errorMessage() {
    return this._errorMessage;
  }

  get modalErrorMessage() {
    return this._modalErrorMessage;
  }

  get viewModel() {
    return this._viewModel;
  }

  set viewModel(val: any) {
    this._viewModel = val;
  }

  get editModel() {
    return this._editModel;
  }

  get activeModel() {
    return this.isEdit ? this.editModel : this.viewModel;
  }

  get showSpinner(): boolean {
    return this.detailsStatus === DetailsStatus.loading;
  }

  get showViewEdit(): boolean {
    return this.detailsStatus === DetailsStatus.loaded || this.detailsStatus === DetailsStatus.edit;
  }

  get isEdit(): boolean {
    return this.detailsStatus === DetailsStatus.edit;
  }

  get showViewToolbar(): boolean {
    return !this.showEditToolbar;
  }

  get showEditToolbar(): boolean {
    return this.detailsStatus === DetailsStatus.edit;
  }

  get showErrorMessage(): boolean {
    return this.detailsStatus === DetailsStatus.error;
  }

  onEdit(): void {
    if (this.viewModel) {
      // Clone the model (to allow for canceling changes)
      this._editModel = cloneModel(this.viewModel);

      // Show the edit view
      this.detailsStatus = DetailsStatus.edit;
    }
  }

  get canEdit(): boolean {
    return (!this.canUpdatePred || this.canUpdatePred()) && (this.activeModel && this.enableEditButtonPred(this.activeModel));
  }

  onCreate(): void {
    this.router.navigate(['..', 'new'], { relativeTo: this.route });
  }

  get canCreate(): boolean {
    return !this.canUpdatePred || this.canUpdatePred();
  }

  onDelete(): void {
    // Assuming the entity is not new
    this.data[this.controller].delete(this.viewModel.Id, this.notifyDestruct$).pipe(
      tap(() => {
        // after a successful delete navigate back to the master
        this.router.navigate(['..'], { relativeTo: this.route });
      }),
      catchError((friendlyError) => {
        // Show the error message in a dismissable modal
        this.showModalError(friendlyError);
        return of(null);
      })
    ).subscribe();
  }

  get canDelete(): boolean {
    return !!this.viewModel && (!this.canUpdatePred || this.canUpdatePred());
  }

  get showDelete(): boolean {
    // Some entities do not have a delete API
    // in this case hide the delete button
    return !!this.data[this.controller].delete;
  }

  onRefresh(): void {
    if (this.detailsStatus !== DetailsStatus.loading) {

      // Clear the cache and fetch again
      this._viewModel = null;
      this.fetch();
    }
  }

  onSave(): void {
    // We need this information for later
    const isNew = !(this.editModel.Id);

    // Prepare the post observable
    this.data[this.controller].post(this.editModel, this.notifyDestruct$).pipe(
      map((result: any) => {

        // update the details with the server version
        this._viewModel = result;
        this._editModel = null;
        this._errorMessage = null;

        if (isNew) {
          this.detailsStatus = DetailsStatus.loaded;
          this.router.navigate(['..', result.Id], { relativeTo: this.route });

        } else {
          this.detailsStatus = DetailsStatus.loaded;
        }
      }),
      catchError(friendlyError => {

        // Show the error in a dismissable modal
        this.showModalError(friendlyError);
        return of(null);
      })
    ).subscribe();
  }

  get canSave(): boolean {
    return !this.data.isSaving;
  }

  onCancel(): void {
    // Remove the edit model
    const isNew = !(this.editModel.Id);

    if (isNew) {

      // To avoid null reference errors
      this._viewModel = this._editModel;

      // To avoid a confirmation modal
      this.detailsStatus = DetailsStatus.loaded;

      // Navigate back to the last screen
      this.location.back();

    } else {
      this._editModel = null;
      this._errorMessage = null;

      // Close the edit form
      this.detailsStatus = DetailsStatus.loaded;
    }
  }

  get canCancel(): boolean {
    return !this.data.isSaving;
  }

  onDblClick() {
    if (this.canEdit) {
      this.onEdit();
    }
  }
}
