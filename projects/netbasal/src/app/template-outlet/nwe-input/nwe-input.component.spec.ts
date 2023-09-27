import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NweInputComponent } from './nwe-input.component';

describe('NweInputComponent', () => {
  let component: NweInputComponent;
  let fixture: ComponentFixture<NweInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NweInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NweInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
