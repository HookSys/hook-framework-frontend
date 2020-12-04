import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewEngineDbPanelComponent } from './ve-dbpanel.component';

describe('ViewEngineDbPanelComponent', () => {
  let component: ViewEngineDbPanelComponent;
  let fixture: ComponentFixture<ViewEngineDbPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngineDbPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngineDbPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
