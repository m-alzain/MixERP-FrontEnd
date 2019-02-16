import { Component, OnInit, Input, Output } from '@angular/core';
import { TenantDto } from 'src/app/shared/models';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'dashboard-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {

  @Input() masterData:TenantDto[];
  @Input() loading: boolean;
  @Input() error: string;

  @Output() search = new EventEmitter();

  constructor() {
  }

  ngOnInit() { 
   
  }

  idFun(model : TenantDto){
      return model.Id;
  }   

  fetch() {
      this.search.emit(null);
  }

  get canCreateTenant() {
    // return !this.canCreatePred || this.canCreatePred();
    return true;
  }
  get canCreateOffice() {
    // return !this.canCreatePred || this.canCreatePred();
    return true;
  }

  onOfficeCreate(){

  }
  onTenantCreate(){
    
  }
  

}
