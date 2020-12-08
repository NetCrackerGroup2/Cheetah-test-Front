import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInCompoundComponent } from './actions-in-compound.component';

describe('ActionsInCompoundComponent', () => {
  let component: ActionsInCompoundComponent;
  let fixture: ComponentFixture<ActionsInCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsInCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsInCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
