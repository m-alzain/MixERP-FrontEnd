import { NgModule } from '@angular/core';

import {
  NgbCollapse,
  NgbPopover,
  NgbDropdownModule, 
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [   
    NgbCollapse,
    NgbPopover,
    
  ],
  imports: [  
    NgbModalModule,
    NgbDropdownModule
  ],
  exports: [
    NgbDropdownModule, 
    NgbCollapse,
    NgbPopover,
    NgbModalModule
  ]
})
export class NgBootstrapModule { }
