import { SchematicObjectControllerService } from './../../../api/services/schematic-object-controller.service';
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

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
