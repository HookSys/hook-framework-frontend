import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngineGridComponent } from './ve-grid.component';

describe('ViewEngineGridComponent', () => {
  let component: ViewEngineGridComponent;
  let fixture: ComponentFixture<ViewEngineGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngineGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
