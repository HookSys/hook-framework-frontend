import { Component, Input, OnInit } from '@angular/core';
import { Feature } from '../../models';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  @Input()
  feature: Feature;

  public dto = {}
  public isVisible = false;
  constructor() {
  }

  ngOnInit() {
    this.dto = [{
      id: this.feature.entrypoint,
      size: 12
    }]
    this.isVisible = true;
  }
}
