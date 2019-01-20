
export enum EntryState {
    Draft = 'Draft',
    Submitted = 'Submitted',
    Approved = 'Approved',
    Posted = 'Posted',
    Canceled = 'Canceled',
    Rejected = 'Rejected',

    ApprovedBySystem = 'Automatically Approved by Workflow',
}

export class StateChange {
    Id: string;
    // FromState: EntryState;
    ToState: EntryState;
    EntryType: string;
}

export class  EntryQuery {
    From : string;
    To : string; 
    Code?: string; 
    ReferenceNumber?: string;            
    StatusId?: number;    
    OfficeId?: number;     
}; 