export class UserDto {

    constructor(){
      this.Roles = []
    }

    Id : string;
    Email : string;    
    Name : string;
    Phone : string;
    Status : boolean;
    LastSeenOn? : string;
    LastIp : string;
    LastBrowser : string;
    Deleted : boolean;
    Offices: OfficeDto[];
    Roles:RoleDto[];
  
    CreatedByUserId ?: string;
    CreatedOn? : string;
    UpdatedByUserId ?: string;
    UpdatedOn ?: string;          
  }
  
export class TenantDto
{
    Id : string;
    TenantCode : string;
    TenantName : string;
    RegistrationDate ?: string;
    CurrencyCode : string;
    AddressLine1 : string;
    AddressLine2 : string;
    Street : string;
    City : string;
    State : string;
    ZipCode : string;
    Country : string;
    Phone : string;
    Fax : string;
    Email : string;
    Url : string;
    // public byte[] Logo { get; set; }
    RegistrationNumber : string;    
    Offices: OfficeDto[]
    CreatedByUserId ?: string;
    CreatedOn? : string;
    UpdatedByUserId ?: string;
    UpdatedOn ?: string;     
}

  export class OfficeDto {
    TenantId : string;
    Id : string;
    OfficeCode : string;
    OfficeName : string;
    NickName : string;
    RegistrationDate ?: string;
    CurrencyCode : string;
    PoBox : string;
    AddressLine1 : string;
    AddressLine2 : string;
    Street : string;
    City : string;
    State : string;
    ZipCode : string;
    Country : string;
    Phone : string;
    Fax : string;
    Email : string;
    Url : string;
    // public byte[] Logo { get; set; }
    ParentOfficeId ?: string;
    RegistrationNumber : string;
    PanNumber : string;
    AllowTransactionPosting: boolean;
    Deleted : boolean;
    Tenant : string;
    ParentOffice : string;
    
    CreatedByUserId ?: string;
    CreatedOn? : string;
    UpdatedByUserId ?: string;
    UpdatedOn ?: string;          
  }
  
  export class RoleDto {
    constructor(){
      this.GroupEntityAccessPolicies = []
    }

    OfficeId : string;
    Id : string;
    RoleName : string;
    IsAdministrator : boolean;
    Deleted : boolean;
    GroupEntityAccessPolicies: GroupEntityAccessPolicyDto [];
  
    CreatedByUserId ?: string;
    CreatedOn? : string;
    UpdatedByUserId ?: string;
    UpdatedOn ?: string;      
  }
  
  export class GroupEntityAccessPolicyDto 
  {
    Id : string;
    EntityTypeId : string;
    RoleId : string;
    AccessType : AccessType;
    AllowAccess : boolean;
    Deleted : boolean;
    EntityType :EntityTypeDto;
    RoleName : string;
  
    CreatedByUserId ?: string;
    CreatedOn? : string;
    UpdatedByUserId ?: string;
    UpdatedOn ?: string;      
  }
  
  export class EntityTypeDto
  {
    Id : string;
    ModuleName : string;
    EntityName : string;
    Url : string;
    Icon : string;
  }
  
  export enum AccessType {
    
    READ = 0,
    CREATE = 1,
    EDIT = 2,
    DELETE = 3,
    CREATEFILTER = 4,
    DELETEFILTER = 5,
    EXPORT = 6,
    EXPORTDATA = 7,
    IMPORTDATA = 8,
    EXECUTE = 9,
    VERIFY = 10,
  }