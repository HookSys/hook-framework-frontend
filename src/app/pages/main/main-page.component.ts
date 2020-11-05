import { Observable } from 'rxjs';
import { FeaturesState } from './../../../view-engine/store/engine/features/features.state';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Select, Selector, Store } from '@ngxs/store';
import { Feature, UserWithRelations} from 'view-engine/api/models';
import { UserState } from 'view-engine/store/user/user.state';
import { OpenFeature } from 'view-engine/store/engine/features/features.actions';


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
  public spotlightOpened = false;
  public spotlightChildrenOpened = false;
  featureOpened: boolean = false;
  public features: Feature[] = [];
  public user: UserWithRelations;

  @Output('exit')
  exit: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store) {
    this.user = this.store.selectSnapshot(UserState.getUser);
    this.features = this.store.selectSnapshot(UserState.getFeatures);
    this.store.select(FeaturesState.hasFeatureOpened).subscribe(hasFeatureOpened => {
      if (this.featureOpened !== hasFeatureOpened) {
        if (!hasFeatureOpened)
          setTimeout(() => this.visible = true, 300);
      }
      this.featureOpened = hasFeatureOpened;
    })
  }

  getUserFullName(): string {
    return `${this.user.firstname} ${this.user.lastname}`;
  }

  ngAfterViewInit() {
    setTimeout(() => this.visible = true, 1000);
  }

  onFeatureClick(feature: Feature) {
    if (!this.spotlightOpened) {
      this.visible = false;
      setTimeout(() => {
        this.store.dispatch(new OpenFeature(feature.id));
      }, 500);
    } else {
      this.store.dispatch(new OpenFeature(feature.id));
      this.spotlightOpened = false;
    }
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
