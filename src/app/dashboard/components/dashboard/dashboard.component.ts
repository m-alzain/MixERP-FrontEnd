import { Component, OnInit, Input } from '@angular/core';
import { OfficeDto } from 'src/app/shared/models';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() office: OfficeDto;

  constructor() { }

  ngOnInit() {
  }

}
