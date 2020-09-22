import { Component, Input, AfterViewInit } from '@angular/core';
import { Feature } from '../../models';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements AfterViewInit {
  dto: any;

  constructor() {
  }

  ngAfterViewInit() {
  }
}
