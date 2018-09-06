import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidActivityComponent } from './valid-activity.component';

describe('ValidActivityComponent', () => {
  let component: ValidActivityComponent;
  let fixture: ComponentFixture<ValidActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
