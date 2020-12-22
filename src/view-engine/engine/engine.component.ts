import { SelectFeature } from './../store/engine/features/features.actions';
import { FeaturesState } from './../store/engine/features/features.state';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Feature } from 'view-engine/api/models';
import { CloseFeature } from 'view-engine/store/engine/features/features.actions';

@Component({
  selector: 've-view-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class ViewEngineComponent implements OnInit {
  features: Feature[] = [];

  @Output()
  onSpotlightClick: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store) {

  }

  ngOnInit() {
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
