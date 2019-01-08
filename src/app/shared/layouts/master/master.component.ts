import { Component, Input, OnDestroy, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable, of, merge, Subject, pipe } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services';
import { ListResult } from '../../models/ListResult';
import { JournalView } from 'src/app/finance/models';

// import { GlobalsResolverService } from '../../data/globals-resolver.service';

enum SearchView {
  tiles = 'tiles',
  table = 'table'
}

// enum MasterStatus {

//   // The master data is currently being fetched from the server
//   loading = 1,

//   // The last fetch of data from the server completed successfully
//   loaded = 2,

//   // The last fetch of data from the server completed with an error
//   error = 3,
// }

@Component({
  selector: 'b-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

  @Input()
  controller: string;

  @Input()
  public tileTemplate: TemplateRef<any>;

  @Input()
  public tableRowTemplate: TemplateRef<any>;

  @Input()
  public toolbarExtrasTemplate: TemplateRef<any>;

  @Input()
  public tableDefinition: { display: string, orderBy?: string }[];

  @Input()
  canCreatePred: () => boolean;

  @Input() masterData :[];
  @Input() loading: boolean;
  @Input() error: string;
  @Input() idFunc: (model: object) => number;
  @Output() fetchEvent = new EventEmitter();
 
  // private PAGE_SIZE = 50;
  // private _search: string = null;
  // private skip = 0;
  // private top = 0;
  // private _total = 0;
  private _orderBy: string = null;
  // private _desc = true;
  // private _bag: { [key: string]: any };
  // private _masterData = [];
  // private masterStatus: MasterStatus;
  // private _errorMessage: string = null;
  private searchView: SearchView;

  // private searchChanged$ = new Subject<string>();
  // private notifyFetch$ = new Subject();
  // private notifyDestruct$ = new Subject<void>();

  constructor(
    // private data: DataService,
    private router: Router,
    private route: ActivatedRoute) {

    // Parameters
    // Use some RxJS magic to refresh the screen as the user changes the parameters
    // const searchBoxSignals = this.searchChanged$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   tap(() => this.skip = 0),
    // );

    // const otherSignals = this.notifyFetch$;
    // const allSignals = merge(searchBoxSignals, otherSignals);
    // allSignals.pipe(
    //   switchMap(() => this.doFetch())
    // ).subscribe();
  }

  ngOnInit() {

    // Set the view from the URL or to 'tiles' by default
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchView = params.has('view') ?
        SearchView[params.get('view')] : SearchView.tiles; // tiles by default
    });

    // Always fetch when you open the screen
    this.fetch();

  }

  ngOnDestroy() {
    // This cancels any asynchronous backend calls
    // this.notifyDestruct$.next();
  }

  private fetch() {
    // this.notifyFetch$.next();
    this.fetchEvent.emit();
  }

  // private doFetch(): Observable<void> {

  //   // Remove everything from the cache
  //   this._masterData = [];
  //   this.masterStatus = MasterStatus.loading;

  //   // Retrieve the entities
  //   return this.data[this.controller].getAll(
  //     this.PAGE_SIZE,
  //     this.skip,
  //     this.orderBy,
  //     this._desc,
  //     this.search,
  //     this.notifyDestruct$,
  //     true // include inactive
  //   ).pipe(
  //     tap((result: ListResult<any>) => {

  //       this.masterStatus = MasterStatus.loaded;
  //       this.top = result.Top;
  //       this.skip = result.Skip;
  //       this._orderBy = result.OrderBy;
  //       this._desc = result.Desc;
  //       this._total = result.TotalCount;
  //       this._masterData = result.Data;
  //       this._bag = result.Bag;
  //     }),
  //     catchError((friendlyError) => {
  //       this.masterStatus = MasterStatus.error;
  //       this._errorMessage = friendlyError;
  //       return of(null);
  //     })
  //   );
  // }

  private urlStateChange(): void {
    // We wish to store part of the page state in the URL
    // This method is called whenever that part of the state has changed
    // Below we capture the new URL state, and then navigate to the new URL
    const params: Params = {
      view: this.searchView
    };

    this.router.navigate(['.', params], { relativeTo: this.route });
  }

  ////////////// UI Bindings below

  // get errorMessage() {
  //   return this._errorMessage;
  // }

  // get masterData() {
  //   return this._masterData;
  // }

  get orderBy() {
    return this._orderBy;
  }

  // onOrderBy(orderBy: string) {
  //   if (!!orderBy) {
  //     if (this._orderBy !== orderBy) {
  //       this._orderBy = orderBy;
  //       this._desc = false;
  //     } else {
  //       if (!this._desc) {
  //         this._desc = true;
  //       } else {
  //         this._orderBy = null;
  //       }
  //     }
  //     this.skip = 0;
  //     this.fetch();
  //   }
  // }

  // get desc() {
  //   return this._desc;
  // }

  // get from(): number {
  //   return Math.min(this.skip + 1, this.total);
  // }

  // get to(): number {
  //   return Math.min(this.skip + this.top, this.total);
  // }

  // get total(): number {
  //   return this._total;
  // }

  // get bag(): any {
  //   return this._bag;
  // }

  // onFirstPage() {
  //   this.skip = 0;
  //   this.fetch();
  // }

  // get canFirstPage(): boolean {
  //   return this.canPreviousPage;
  // }

  // onPreviousPage() {
  //   this.skip = Math.max(this.skip - this.PAGE_SIZE, 0);
  //   this.fetch();
  // }

  // get canPreviousPage(): boolean {
  //   return this.skip > 0;
  // }

  // onNextPage() {
  //   this.skip = this.skip + this.PAGE_SIZE;
  //   this.fetch();
  // }

  // get canNextPage(): boolean {
  //   return this.to < this.total;
  // }

  get showTilesView(): boolean {
    return this.searchView === SearchView.tiles;
  }

  get showTableView(): boolean {
    return this.searchView === SearchView.table;
  }

  // get showErrorMessage(): boolean {
  //   return this.masterStatus === MasterStatus.error;
  // }

  // get showSpinner(): boolean {
  //   return this.masterStatus === MasterStatus.loading;
  // }

  get showNoItemsFound(): boolean {
    return ! this.loading &&
      (!this.masterData || this.masterData.length === 0);
  }

  onTilesView() {
    this.searchView = SearchView.tiles;
    this.urlStateChange();
  }

  onTableView() {
    this.searchView = SearchView.table;
    this.urlStateChange();
  }

  onCreate() {
    this.router.navigate(['.', 'new'], { relativeTo: this.route });
  }

  get canCreate() {
    return !this.canCreatePred || this.canCreatePred();
  }

  onRefresh() {
    if (! this.loading) {
      this.fetch();
    }
  }

  // get search(): string {
  //   return this._search;
  // }

  // set search(val: string) {
  //   if (this._search !== val) {
  //     this._search = val;
  //   }
  //   this.searchChanged$.next(val);
  // }
}
