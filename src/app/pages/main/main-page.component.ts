import { IViewEngineFeatureHandler } from './../../../view-engine/components/organisms/ve-feature/ve-feature.interface';
import { ApplicationStore } from './../../store/application.store';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';

import { Feature } from '../../models';

interface OpenedFeature extends Feature {
  selected: boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('0 => 1', animate('200ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ]),
    trigger('dropdownMenu', [
      state('false', style({ height: 0, opacity: 0, display: 'none' })),
      state('true', style({ height: 70, opacity: 1, display: 'block' })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ]),
    trigger('spotlight', [
      state('false', style({ width: '11%', height: '6%', display: 'none' })),
      state('true', style({ width: '100%', height: '100%', display: 'flex' })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ]),
    trigger('spotlightChildren', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: 1, display: 'block'})),
      transition('0 => 1', animate('500ms ease-in')),
      transition('1 => 0', animate('1ms ease-out'))
    ])
  ]
})
export class MainPageComponent implements AfterViewInit {
  public visible = false;
  public menu = false;
  public featureOpened = false;
  public selectedFeature: Feature;
  public spotlightOpened = false;
  public spotlightChildrenOpened = false;

  public openedFeatures: OpenedFeature[] = [];
  public features: Feature[] = [];

  @Output('exit')
  exit: EventEmitter<boolean> = new EventEmitter();

  constructor(private applicationStore: ApplicationStore) {
    this.features = this.applicationStore.user.policies[0].features.map(
      (f) => ({ ...f, icon: f.icon.toLowerCase() })
    );
  }

  ngAfterViewInit() {
    setTimeout(() => this.visible = true, 1000);
  }

  onFeatureClick(feature: Feature) {
    if (!this.spotlightOpened) {
      this.visible = false;
      this.selectedFeature = feature;
      setTimeout(() => {
        this.featureOpened = true;
        this.openedFeatures.push({
          ...feature,
          selected: true
        });
      }, 500);
    } else {
      this.selectedFeature = feature;
      this.openedFeatures = this.openedFeatures.map(openedFeature => {
        openedFeature.selected = false;
        return openedFeature;
      });
      this.openedFeatures.push({
        ...feature,
        selected: true
      });
      this.spotlightOpened = false;
    }
  }

  selectFunction(feature: Feature) {
    this.selectedFeature = feature;
    this.openedFeatures = this.openedFeatures.map(openedFeature => {
      openedFeature.selected = (openedFeature.code === feature.code);
      return openedFeature;
    });
  }

  openMenu() {
    this.menu = !this.menu;
  }

  changeCnpj() {
  }

  logout() {
    this.visible = false;
    setTimeout(() => {
      this.exit.emit();
    }, 500);
  }

  closeFunction(feature: Feature) {
    this.openedFeatures = this.openedFeatures.filter(feat => feat.code !== feature.code);
    if (this.openedFeatures.length > 0) {
      this.openedFeatures[0].selected = true;
      this.selectedFeature = this.openedFeatures[0];
    } else {
      this.featureOpened = false;
      this.selectedFeature = null;
      setTimeout(() => this.visible = true, 300);
    }
  }

  onSpotlightClick() {
    this.spotlightOpened = !this.spotlightOpened;
  }

  onSpotlightStartAnimation() {
    if (!this.spotlightOpened) {
      this.spotlightChildrenOpened = false;
    }
  }
  onSpotlightEndAnimation() {
    if (this.spotlightOpened) {
      setTimeout(() => this.spotlightChildrenOpened = true, 50);
    }
  }

  onMainClick() {
    if (this.menu) {
      this.menu = false;
    }
  }

}
