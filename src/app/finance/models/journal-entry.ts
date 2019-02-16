
export class JournalEntryDto
{
    TransactionMasterId: number;
    TransactionCounter: number;
    TransactionCode: string;
    Book: string;
    ValueDate: string;
    BookDate: string;
    TransactionTs : string; // DateTimeOffset
    LoginId: number;
    UserId: number;
    OfficeId: number;
    CostCenterId ?: number;
    ReferenceNumber: string;
    StatementReference ?: string;
    LastVerifiedOn ?: string; // DateTimeOffset?
    VerifiedByUserId ?: number;
    VerificationStatusId?: number;
    VerificationReason ?: string;
    CascadingTranId ?: number;
    AuditUserId?: number;
    AuditTs : string; // DateTimeOffset?
    Deleted?: boolean;
    
    JournalEntryLines : JournalEntryLineDto []; 
    
    CostCenter?: string;
    Office?: string;
    Status?: string;
    VerifiedByUser?: string;
}

export class JournalEntryLineDto
{
    TransactionDetailId: number;
    TransactionMasterId: number;
    ValueDate: string;
    BookDate: string;
    TranType : string;
    AccountId: number;
    StatementReference: string;
    ReconciliationMemo: string;
    CashRepositoryId?: number;
    CurrencyCode: string;
    AmountInCurrency: number;
    LocalCurrencyCode: string;
    Er: number;
    AmountInLocalCurrency: number;
    OfficeId: number;
    AuditUserId?: number;
    AuditTs?: string; // DateTimeOffset? 
    
    
    Account?: string
}
 