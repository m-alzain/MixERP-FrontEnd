import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'b-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {

  @Input()
  public scale = 1;

  @HostBinding('class.navbar-brand')
  navbarBrand = true;
}
