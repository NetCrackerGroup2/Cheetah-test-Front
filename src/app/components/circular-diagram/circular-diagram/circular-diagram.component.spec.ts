import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CircularDiagramComponent} from './circular-diagram.component';

describe('CircularDiagramComponent', () => {
  let component: CircularDiagramComponent;
  let fixture: ComponentFixture<CircularDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
