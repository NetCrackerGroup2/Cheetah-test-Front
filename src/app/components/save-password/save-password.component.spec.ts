import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SavePasswordComponent} from './save-password.component';

describe('SavePasswordComponent', () => {
  let component: SavePasswordComponent;
  let fixture: ComponentFixture<SavePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
