import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IViewEngineDbTable } from '../ve-dbtable/ve-dbtable.interface';
import { ViewEngineFeatureHandler } from './ve-feature.handler';
import { IViewEngineFeature } from './ve-feature.interface';
import { ViewEngineFeatureService } from './ve-feature.service';

@Component({
  selector: 've-feature',
  templateUrl: './ve-feature.component.html',
  styleUrls: ['./ve-feature.component.scss'],
})
export class ViewEngineFeatureComponent implements OnInit, OnDestroy {
  @Input()
  feature: IViewEngineFeature;

  public entrypoint: IViewEngineDbTable;

  constructor(
    private featureHandler: ViewEngineFeatureHandler,
    private featureService: ViewEngineFeatureService
  ) {
  }

  public ngOnInit() {
    this.featureHandler.registerComponent(this.feature, this);
    this.featureService.get(this.feature.id).subscribe(({ entrypoint }) => {
      this.entrypoint = entrypoint;
      this.featureHandler.setSelectedFeature(this.feature.id);
    })
  }

  public ngOnDestroy() {
    this.featureHandler.setSelectedFeature(null);
    this.featureHandler.unregister(this.feature);
  }
}
