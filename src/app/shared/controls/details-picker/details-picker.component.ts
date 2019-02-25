import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { fromEvent, of, Subject, Subscription, Observable } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { format } from 'url';
// import { DataService } from '../../services';
// import { ListResult } from '../../models';

enum SearchStatus {
  showSpinner = 'showSpinner',
  showResults = 'showResults',
  showError = 'showError'
}

enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

@Component({
  selector: 'b-details-picker',
  templateUrl: './details-picker.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DetailsPickerComponent }]
})
export class DetailsPickerComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

  ///////////////// Private Fields
  // private MIN_CHARS_TO_SEARCH = 1;
  // private SEARCH_PAGE_SIZE = 15;

  // private cancelRunningCall$ = new Subject<void>();
  private userInputSubscription: Subscription;
  private resultSubscription: Subscription;
  private loadingSubscription: Subscription;
  private errorSubscription: Subscription;
  private _status: SearchStatus = null;
  private _isDisabled = false;
  private _searchResults = [];
  private _formaterResults = [];
  @Input() searchResults$: Observable<[]>;;
  @Input() loading$: Observable<boolean>;
  @Input() error$: Observable<string>;
  @Output() onTerm: EventEmitter<any> = new EventEmitter();
  private _highlightedIndex = 0;
  private chosenItem: any;

  ///////////////// Input Fields
  @ViewChild('input')
  input: ElementRef;

  @ViewChild(NgbDropdown)
  resultsDropdown: NgbDropdown;

  @Input()
  focusIf: boolean;

  // @Input()
  // controller: string;

  @Input()
  formatter: (entity: any) => string = (entity: any) => entity.Name
  @Input()
  idFun: (entity: any) => string = (entity: any) => entity.Id

  format(id:string){    
    return this.formatter( this._formaterResults.find(e => e.Id == id));   
  }
  
  ///////////////// Lifecycle Hooks
  constructor(
      // private data: DataService
    ) {
      
     }

  ngAfterViewInit() {

    if (this.focusIf) {
      this.input.nativeElement.focus();
    }

    this.resultSubscription = this.searchResults$.subscribe(result =>  {this.status = SearchStatus.showResults; this._formaterResults = result; this._searchResults = result.map(r => this.idFun(r) ); this._highlightedIndex = 0;});
    this.loadingSubscription = this.loading$.subscribe(loading =>  {this.status =  (!!loading) ? SearchStatus.showSpinner : this.status = SearchStatus.showResults;});
    this.errorSubscription = this.error$.subscribe(error =>  { if(!!error) {this.status = SearchStatus.showError;}});
    // Use some RxJS magic to listen to user input and call the backend
    // in order to show the results in a dropdown
    this.userInputSubscription = fromEvent(this.input.nativeElement, 'input').pipe(
      map((e: any) => <string>e.target.value),
      tap(term => {
        // As soon as the user starts typing:
        // this._searchResults = []; // clear the results    -----------------       Here we may clear the state
        this.status = null; // hide the dropdown
        // this.cancelRunningCall$.next(); // cancel any existing backend call immediately

        // If the user cleared the value
        if (!term) {
          this.chooseItem(null);
        }
      }),
      debounceTime(200), // Takes it easy on the poor server
      // switchMap(term => {
      //   if (!term || term.length < this.MIN_CHARS_TO_SEARCH) {
      //     return of([]);
      //   } else {
      //     this.status = SearchStatus.showSpinner;
      //     return this.data[this.controller].getAll(this.SEARCH_PAGE_SIZE, 0, 'Id', false, term, this.cancelRunningCall$).pipe(
      //       tap(() => this.status = SearchStatus.showResults),
      //       map((res: ListResult<any>) => res.Data),
      //       catchError(() => {
      //         this.status = SearchStatus.showError;
      //         return of([]);
      //       })
      //     );
      //   }
      // })    
    ).subscribe((term: any) => {
      // Populate the dropdown with the results
      // this._searchResults = term;
      this.onTerm.emit(term);
      // Auto select the first result
      // this._highlightedIndex = 0; // auto select the first item
    });
  }

  ngOnDestroy(): void {
    // cleanup duty 
    if (!!this.userInputSubscription) {
      this.userInputSubscription.unsubscribe();
    }
    if (!!this.resultSubscription) {
      this.resultSubscription.unsubscribe();
    }
    if (!!this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (!!this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }



  ///////////////// Helper Functions
  private get status(): SearchStatus {
    return this._status;
  }

  private set status(val: SearchStatus) {

    if(document.activeElement == this.input.nativeElement){
      if (!this._status && !!val) {
        this.resultsDropdown.open();
      }
      if (!!this._status && !val) {
        this.resultsDropdown.close();
      }

      this._status = val;
    }
  }

  onDocumentClick(event) {
    if (event.target !== this.input.nativeElement) {
      this.status = null;
    }
  }

  private chooseItem(item: any) {
    // Restart input stream
    // this.cancelRunningCall$.next(null);

    this.chosenItem = item;

    // Show the selection in the input box
    this.updateUI(item);

    // Signal ControlValueAccessor
    this.onChange(item); // TODO only the ID

    // Close the dropdown
    this.status = null;
  }

  private updateUI(item: any) {

    const display = !!item ? this.format(item) : '';
    this.input.nativeElement.value = display;
  }

  private toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
  }

  ///////////////// Implementation of ControlValueAccessor
  private onChange = (e: any) => { };
  private onTouched = () => { };

  writeValue(v: any): void {

    if (!!v) {
      this.chooseItem(v);
    }
  }

  registerOnChange(fn: (val: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  ////////////////// UI Bindings
  get searchResults() {
    return this._searchResults;
  }

  get highlightedIndex() {
    return this._highlightedIndex;
  }

  get isDisabled() {
    return this._isDisabled;
  }

  get showSpinner(): boolean {
    return this.status === SearchStatus.showSpinner;
  }

  get showError(): boolean {
    return this.status === SearchStatus.showError;
  }

  get showNoItemsFound(): boolean {
    return this.status === SearchStatus.showResults &&
      (!!this._searchResults && this._searchResults.length === 0);
  }

  get showResults(): boolean {
    return this.status === SearchStatus.showResults &&
      (!!this._searchResults && this._searchResults.length > 0);
  }

  get placement(): PlacementArray {
    return ['bottom-left', 'bottom-right', 'bottom'];
  }

  onMouseEnter(i: number) {
    this._highlightedIndex = i;
  }

  onBlur() {
    // Restart input stream and cancel existing backend calls
    
    //----------- if the onTerm action has an effect that calls the backend you may want to tell it to stop; but there is no such thing for now.
    // this.cancelRunningCall$.next();                

    // Signal on touched
    this.onTouched();

    // Set the displayed value appropriately
    const item = this.chosenItem;
    this.updateUI(item);
  }

  onKeyDown(event: KeyboardEvent) {
    // Use key events on the input to highlight and select from the search results
    // without losing the focus from the input element

    if (!this.status) {
      return;
    }

    if (Key[this.toString(event.which)]) {
      switch (event.which) {
        case Key.ArrowDown:
          // Event was handled
          event.preventDefault();

          if (!!this._searchResults) {
            if (this._highlightedIndex < this._searchResults.length - 1) {
              // Increment the highlighted index if we're not at the end
              this._highlightedIndex++;
            } else {
              this._highlightedIndex = 0;
            }
          }
          break;

        case Key.ArrowUp:
          // Event was handled
          event.preventDefault();

          if (!!this._searchResults) {

            if (this._highlightedIndex <= 0) {
              this._highlightedIndex = this._searchResults.length - 1;
            } else {
              // Decrement the highlighted index if we're not at the beginning
              this._highlightedIndex--;
            }
          }
          break;

        case Key.Enter:
        case Key.Tab:

          // Retrieve the selected value
          const chosenValue = this._searchResults[this._highlightedIndex];

          if (!!chosenValue) {

            // Event has been handled
            event.preventDefault();
            event.stopPropagation();

          }

          this.chooseItem(chosenValue);

          break;

        case Key.Escape:
          // Event was handled
          event.preventDefault();

          //----------- if the onTerm action has an effect that calls the backend you may want to tell it to stop; but there is no such thing for now.
          // Restart input stream and cancel existing backend calls
          // this.cancelRunningCall$.next(null);

          // Close the dropdown
          this.status = null;
          break;
      }
    }
  }

  onFocus(item: any) {
    this.chooseItem(item);
  }
}
