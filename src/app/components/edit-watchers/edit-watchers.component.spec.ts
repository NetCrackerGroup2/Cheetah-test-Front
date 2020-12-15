import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWatchersComponent } from './edit-watchers.component';

describe('EditWatchersComponent', () => {
  let component: EditWatchersComponent;
  let fixture: ComponentFixture<EditWatchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWatchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
