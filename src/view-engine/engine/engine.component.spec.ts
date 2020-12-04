import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewEngineComponent } from './engine.component';

describe('ViewEngineComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ViewEngineComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ViewEngineComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'view-engine'`, () => {
    const fixture = TestBed.createComponent(ViewEngineComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('view-engine');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ViewEngineComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('view-engine app is running!');
  });
});
