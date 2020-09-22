import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngineDbTableComponent } from './ve-dbtable.component';

describe('ViewEngineDbTableComponent', () => {
  let component: ViewEngineDbTableComponent;
  let fixture: ComponentFixture<ViewEngineDbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngineDbTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngineDbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
