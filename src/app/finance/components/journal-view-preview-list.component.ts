import { Component, Input, OnInit , EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import { JournalView } from '../models';

enum SearchView {
    tiles = 'tiles',
    table = 'table'
}


@Component({
    selector: 'bc-journal-view-preview-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-card>   
        <mat-card-content>       
            <b-master controller="journalviews"
                [toolbarExtrasTemplate]="toolbarExtrasTemplate"
                [tileTemplate]="tileTemplate"
                [tableDefinition]="[
                    { display: 'TranId', orderBy: 'transactionMasterId' },
                    { display: 'TranCode', orderBy: 'transactionCode' },
                    { display: 'ValueDate',  orderBy: 'valueDate'},
                    { display: 'BookDate' },
                    { display: 'RefererenceNumberAbbreviated' },
                    { display: 'Amount' },
                    { display: 'StatementReference' },
                    { display: 'PostedBy' },
                    { display: 'Office' },
                    { display: 'Status' },
                    { display: 'VerifiedBy' },
                    { display: 'VerifiedOn' },
                    { display: 'Reason' }
                    ]"
                [tableRowTemplate]="tableRowTemplate"
                [masterData]="masterData"
                [loading]="loading"
                [error]="error"
                [idFunc]="idFun">
                
            </b-master>
        </mat-card-content>           
    </mat-card>
     
    <!--Templates Parts-->     
    <ng-template #tileTemplate let-model="model">
    <div class="d-flex justify-content-between">
        <span class="d-block text-truncate">{{ model.transactionCode }}</span>       
    </div>
    <div class="d-flex justify-content-between mt-1 small">
        <span>{{model.valueDate | date }}</span>
        <ng-container *ngTemplateOutlet="stateTemplate; context: { model: model }"></ng-container>
    </div>
    </ng-template>

    <ng-template #tableRowTemplate let-model="model">
    <td>{{ model.transactionMasterId }}</td>
    <td>{{ model.transactionCode }}</td>
    <td>{{ model.valueDate | date }}</td>
    <td>{{ model.bookDate | date }}</td>
    <td>{{ model.referenceNumber }}</td>
    <td>{{ model.amount }}</td>
    <td>{{ model.statementReference }}</td>
    <td>{{ model.postedBy }}</td>
    <td>{{ model.office }}</td>
    <td><ng-container *ngTemplateOutlet="stateTemplate; context: { model: model }"></ng-container></td>
    <td>{{ model.verifiedBy }}</td>
    <td>{{ model.verifiedOn }}</td>
    <td>{{ model.reason }}</td>
    </ng-template>

    <ng-template #stateTemplate let-model="model">
    <span class="text-white pl-1 pr-1"
            [class.bg-secondary]="model.status === 'Submitted' || model.status === 'Draft'"
            [class.bg-dark]="model.status === 'Automatically Approved by Workflow'" [class.bg-danger]="model.status === 'Rejected'"
            [class.bg-warning]="model.status === 'Canceled'" [class.bg-success]="model.status === 'Posted'">{{ model.status }}</span>
    </ng-template>

    <ng-template #toolbarExtrasTemplate let-bag="bag">
    <div class="d-inline small mr-2 ml-2" *ngIf="bag && showMyBalance">
        <span class="d-none d-sm-inline b-vertical-align-middle">No Extras:&nbsp;</span>       
    </div>
    </ng-template>
    `,
    styles: [
        `
        `,
    ],
})


export class JournalViewPreviewListComponent implements OnInit {
    @Input() masterData:JournalView[];
    @Input() loading: boolean;
    @Input() error: string;

    @Output() fetchEvent = new EventEmitter();

    constructor() {
    }

    ngOnInit() { 
    }

    idFun(model : JournalView){
        return model.transactionMasterId;
    }
   
    private fetch() {       
        this.fetchEvent.emit();
    }

}
