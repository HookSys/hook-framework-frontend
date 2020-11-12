import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngineDbPanelComponent } from './ve-dbpanel.component';

describe('ViewEngineDbPanelComponent', () => {
  let component: ViewEngineDbPanelComponent;
  let fixture: ComponentFixture<ViewEngineDbPanelComponent>;

  beforeEach(async(() => {
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
