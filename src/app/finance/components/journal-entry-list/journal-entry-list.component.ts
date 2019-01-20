import { Component, Input, OnInit , EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import { JournalEntryDto } from '../../models';
import { EntryQuery } from 'src/app/shared/models';

@Component({
    selector: 'finance-journal-entry-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl:  './journal-entry-list.component.html',
    styleUrls: [  './journal-entry-list.component.scss']
})


export class JournalEntryListComponent implements OnInit {
    public entryQuery : EntryQuery;
    @Input() masterData:JournalEntryDto[];
    @Input() loading: boolean;
    @Input() error: string;

    @Output() search = new EventEmitter<EntryQuery>();
  
    constructor() {
    }

    ngOnInit() { 

        var from = new Date().setDate(1); // first date of the current month
        from = new Date(from).setMonth(0); // first month of the current year
        this.entryQuery = {
            From : new Date(from).toJSON(),
            To : new Date().toJSON(),  
            Code : '',
            ReferenceNumber : '',           
            StatusId : 1,      
            OfficeId : 1,     
          };
          
    }

    idFun(model : JournalEntryDto){
        return model.TransactionMasterId;
    }   

    fetch() {
        this.search.emit({ ...this.entryQuery});
    }

}
