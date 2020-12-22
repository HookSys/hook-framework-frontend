import { Store } from '@ngxs/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Feature } from 'view-engine/api/models';

@Component({
  selector: 've-feature',
  templateUrl: './ve-feature.component.html',
  styleUrls: ['./ve-feature.component.scss'],
})
export class ViewEngineFeatureComponent implements OnInit, OnDestroy {
  @Input()
  feature: Feature;

  constructor(private store: Store) {}

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
