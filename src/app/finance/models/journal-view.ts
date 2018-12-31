export interface JournalView {   
    transactionMasterId: number;
    transactionCode : string;
    book: string;
    valueDate : string;
    bookDate : string;
    referenceNumber : string;
    statementReference : string;
    amount : number;
    postedBy : string;
    office : string;
    status : string;
    verifiedBy : string;
    verifiedOn : string;
    reason : string;
    transactionTs : string;
}
export interface JournalViewQuery
{
    UserId: number;
    OfficeId: number;
    From : string;
    To : string;
    TranId: number;
    TranCode : string;
    Book : string;
    ReferenceNumber : string;
    StatementReference : string;
    PostedBy : string;
    Amount: number;
    Office : string;
    Status : string;
    VerifiedBy : string;
    Reason : string;
}