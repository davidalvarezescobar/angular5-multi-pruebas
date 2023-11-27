import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuAppComponent } from './context-menu-app.component';

describe('ContextMenuAppComponent', () => {
  let component: ContextMenuAppComponent;
  let fixture: ComponentFixture<ContextMenuAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextMenuAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextMenuAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
