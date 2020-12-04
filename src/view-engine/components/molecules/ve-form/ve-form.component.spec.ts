import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewEngineFormComponent } from './ve-form.component';

describe('ViewEngineFormComponent', () => {
  let component: ViewEngineFormComponent;
  let fixture: ComponentFixture<ViewEngineFormComponent>;

  beforeEach(waitForAsync(() => {
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
