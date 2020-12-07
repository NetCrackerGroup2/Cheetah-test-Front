import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataSetComponent } from './edit-data-set.component';

describe('EditDataSetComponent', () => {
  let component: EditDataSetComponent;
  let fixture: ComponentFixture<EditDataSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
