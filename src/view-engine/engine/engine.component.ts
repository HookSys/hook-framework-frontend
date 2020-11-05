import { SelectFeature } from './../store/engine/features/features.actions';
import { Observable } from 'rxjs';
import { FeaturesState } from './../store/engine/features/features.state';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Feature, FeatureWithRelations } from 'view-engine/api/models';
import { CloseFeature, OpenFeature } from 'view-engine/store/engine/features/features.actions';

@Component({
  selector: 've-view-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class ViewEngineComponent {
  features: Feature[];

  @Output()
  onSpotlightClick: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store) {
    this.store.select(FeaturesState.getFeatures).subscribe(t =>{
       this.features = t
    });
  }

  selectFunction(feature: Feature) {
    this.store.dispatch(new SelectFeature(feature));
  }

  closeFunction(feature: Feature) {
    this.store.dispatch(new CloseFeature(feature));
  }

  onSpotlightClickIn() {
    this.onSpotlightClick.emit();
  }

}
