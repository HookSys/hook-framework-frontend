import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngineFormComponent } from './ve-form.component';

describe('ViewEngineFormComponent', () => {
  let component: ViewEngineFormComponent;
  let fixture: ComponentFixture<ViewEngineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
